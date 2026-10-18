import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import Header from "./components/Header";
import Footer from "./components/Footer";
import JoinCard from "./components/JoinCard";
import ShareBoard from "./components/ShareBoard";

const BACKEND_URL = "https://blinkshare-backend-1x4h.onrender.com";
const socket = io(BACKEND_URL);


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [joined, setJoined] = useState(false);

  const [roomCode, setRoomCode] = useState([
    "",
    "",
    "",
    ""
  ]);

  const [deviceName, setDeviceName] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [messageText, setMessageText] =
    useState("");

  const [files, setFiles] =
    useState([]);

  const [lastUpdated, setLastUpdated] =
    useState("");

  /* ---------------- THEME ---------------- */

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("blink-theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  /* ---------------- SOCKET LISTENERS ---------------- */

  useEffect(() => {
    socket.on(
      "receive-message",
      (data) => {
        setMessages((prev) => [
          ...prev,
          data
        ]);

        setLastUpdated(data.time);
      }
    );

    socket.on(
      "receive-file",
      (fileData) => {
        setFiles((prev) => [
          ...prev,
          fileData
        ]);
      }
    );

    return () => {
      socket.off("receive-message");
      socket.off("receive-file");
    };
  }, []);

  /* ---------------- THEME TOGGLE ---------------- */

  const toggleTheme = () => {
    const nextTheme = !darkMode;

    setDarkMode(nextTheme);

    localStorage.setItem(
      "blink-theme",
      nextTheme ? "dark" : "light"
    );
  };

  /* ---------------- ROOM INPUT ---------------- */

  const handleRoomBox = (
    index,
    value
  ) => {
    const onlyNumber =
      value.replace(/\D/g, "");

    const updated = [
      ...roomCode
    ];

    updated[index] =
      onlyNumber.slice(-1);

    setRoomCode(updated);

    if (
      onlyNumber &&
      index < 3
    ) {
      const nextInput =
        document.getElementById(
          `room-${index + 1}`
        );

      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleBackspace = (
    index,
    e
  ) => {
    if (
      e.key === "Backspace" &&
      roomCode[index] === "" &&
      index > 0
    ) {
      const prevInput =
        document.getElementById(
          `room-${index - 1}`
        );

      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  /* ---------------- JOIN ROOM ---------------- */

  const joinRoom = () => {
    const finalCode =
      roomCode.join("");

    if (finalCode.length < 4) {
      alert(
        "Enter complete room code"
      );
      return;
    }

    if (!deviceName.trim()) {
      alert(
        "Enter device name"
      );
      return;
    }

    socket.emit(
      "join-room",
      {
        roomCode: finalCode,
        deviceName
      }
    );

    setJoined(true);
  };

  /* ---------------- LEAVE ROOM ---------------- */

  const leaveRoom = () => {
    setJoined(false);
    setMessages([]);
    setMessageText("");
    setFiles([]);
    setLastUpdated("");
  };

  const currentRoom =
    roomCode.join("");

  /* ---------------- SEND MESSAGE ---------------- */

  const sendMessage = () => {
    if (!messageText.trim()) {
      return;
    }

    const newTime =
      new Date().toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit"
        }
      );

    socket.emit(
      "send-message",
      {
        roomCode: currentRoom,
        text: messageText,
        sender: deviceName,
        time: newTime
      }
    );

    setLastUpdated(newTime);
    setMessageText("");
  };

  /* ---------------- FILE UPLOAD ---------------- */

  const handleFileChange =
    async (e) => {
      const file =
        e.target.files[0];

      if (!file) {
        return;
      }

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "roomCode",
        currentRoom
      );

      try {
        const res =
         await fetch(
    `${BACKEND_URL}/upload`,
    {
              method: "POST",
              body: formData
            }
          );

        if (!res.ok) {
          throw new Error(
            "Upload failed"
          );
        }

        await res.json();

      } catch (error) {
        console.error(
          "File upload error:",
          error
        );

        alert(
          "Upload failed"
        );
      }
    };

  /* ---------------- CLEAR BOARD ---------------- */

  const clearBoard = () => {
    setMessages([]);
    setMessageText("");
    setLastUpdated("");
  };

  /* ---------------- COPY TEXT ---------------- */

  const copyText = async (
    text
  ) => {
    await navigator.clipboard.writeText(
      text
    );

    alert("Copied");
  };

  /* ---------------- COLORS ---------------- */

  const pageBg = darkMode
    ? "linear-gradient(135deg,#020617,#111827,#1e293b)"
    : "linear-gradient(135deg,#eff6ff,#f8fafc,#ffffff)";

  const cardBg = darkMode
    ? "rgba(17,24,39,0.88)"
    : "rgba(255,255,255,0.95)";

  const textColor = darkMode
    ? "#ffffff"
    : "#111827";

  const subText = darkMode
    ? "#9ca3af"
    : "#6b7280";

  /* ---------------- UI ---------------- */

  return (
    <div
      style={{
        minHeight: "100vh",
        background: pageBg,
        color: textColor,
        fontFamily:
          "Inter, Arial, sans-serif",
        padding: "24px",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={glowOne}></div>
      <div style={glowTwo}></div>

      <div
        style={{
          maxWidth: "820px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2
        }}
      >
        <Header
          darkMode={darkMode}
          toggleTheme={
            toggleTheme
          }
          subText={subText}
        />

        <div
          style={{
            ...cardStyle,
            background: cardBg,
            color: textColor
          }}
        >
          {!joined ? (
            <JoinCard
              darkMode={darkMode}
              subText={subText}
              roomCode={roomCode}
              handleRoomBox={
                handleRoomBox
              }
              handleBackspace={
                handleBackspace
              }
              labelStyle={
                labelStyle
              }
              roomGrid={
                roomGrid
              }
              roomBox={
                roomBox
              }
              inputStyle={
                inputStyle
              }
              deviceName={
                deviceName
              }
              setDeviceName={
                setDeviceName
              }
              joinBtn={
                joinBtn
              }
              joinRoom={
                joinRoom
              }
              pillWrap={
                pillWrap
              }
              pill={pill}
              badgeStyle={
                badgeStyle
              }
            />
          ) : (
            <ShareBoard
              currentRoom={
                currentRoom
              }
              deviceName={
                deviceName
              }
              subText={
                subText
              }
              badgeStyle={
                badgeStyle
              }
              actionWrap={
                actionWrap
              }
              smallBtnRed={
                smallBtnRed
              }
              clearBoard={
                clearBoard
              }
              chatBox={
                chatBox
              }
              messages={
                messages
              }
              copyText={
                copyText
              }
              lastUpdated={
                lastUpdated
              }
              textareaStyle={
                textareaStyle
              }
              messageText={
                messageText
              }
              setMessageText={
                setMessageText
              }
              joinBtn={
                joinBtn
              }
              sendMessage={
                sendMessage
              }
              leaveBtn={
                leaveBtn
              }
              leaveRoom={
                leaveRoom
              }
              files={files}
              setFiles={
                setFiles
              }
              handleFileChange={
                handleFileChange
              }
            />
          )}
        </div>

        <Footer
          subText={subText}
        />
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const cardStyle = {
  borderRadius: "28px",
  padding: "34px",
  backdropFilter: "blur(12px)",
  boxShadow:
    "0 20px 50px rgba(0,0,0,0.12)"
};

const badgeStyle = {
  display: "inline-block",
  padding: "8px 14px",
  borderRadius: "999px",
  background: "#dbeafe",
  color: "#1d4ed8",
  fontWeight: "700",
  fontSize: "13px",
  marginBottom: "18px"
};

const pillWrap = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
};

const pill = (darkMode) => ({
  padding: "10px 14px",
  borderRadius: "999px",
  fontSize: "14px",
  fontWeight: "700",
  background: darkMode
    ? "#1f2937"
    : "#f1f5f9",
  border: darkMode
    ? "1px solid #374151"
    : "1px solid #e5e7eb"
});

const labelStyle = {
  fontSize: "14px",
  fontWeight: "700",
  marginBottom: "8px",
  marginTop: "14px"
};

const roomGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(4, minmax(0,1fr))",
  gap: "12px",
  marginBottom: "14px"
};

const roomBox = (darkMode) => ({
  height: "62px",
  borderRadius: "16px",
  border: darkMode
    ? "1px solid #374151"
    : "1px solid #d1d5db",
  background: darkMode
    ? "#111827"
    : "#ffffff",
  color: darkMode
    ? "#ffffff"
    : "#111827",
  textAlign: "center",
  fontSize: "26px",
  fontWeight: "800",
  outline: "none"
});

const inputStyle = {
  width: "100%",
  padding: "15px",
  borderRadius: "16px",
  border:
    "1px solid #d1d5db",
  fontSize: "15px",
  boxSizing: "border-box",
  marginBottom: "12px"
};

const textareaStyle = {
  width: "100%",
  padding: "15px",
  borderRadius: "16px",
  border:
    "1px solid #d1d5db",
  fontSize: "15px",
  boxSizing: "border-box",
  marginBottom: "12px",
  resize: "vertical",
  minHeight: "150px",
  fontFamily:
    "Consolas, monospace"
};

const joinBtn = {
  width: "100%",
  padding: "15px",
  borderRadius: "16px",
  border: "none",
  background:
    "linear-gradient(90deg,#2563eb,#1d4ed8)",
  color: "white",
  fontWeight: "800",
  fontSize: "15px",
  cursor: "pointer"
};

const leaveBtn = {
  width: "100%",
  marginTop: "10px",
  padding: "15px",
  borderRadius: "16px",
  border: "none",
  background: "#ef4444",
  color: "white",
  fontWeight: "800",
  fontSize: "15px",
  cursor: "pointer"
};

const actionWrap = {
  display: "flex",
  gap: "10px",
  marginBottom: "12px"
};

const smallBtnRed = {
  flex: 1,
  padding: "12px",
  border: "none",
  borderRadius: "14px",
  background: "#ef4444",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "700"
};

const chatBox = {
  minHeight: "240px",
  maxHeight: "320px",
  overflowY: "auto",
  padding: "14px",
  borderRadius: "16px",
  background:
    "rgba(255,255,255,0.06)",
  marginBottom: "14px"
};

const glowOne = {
  position: "absolute",
  width: "260px",
  height: "260px",
  borderRadius: "50%",
  background:
    "rgba(59,130,246,0.18)",
  top: "-60px",
  left: "-60px",
  filter: "blur(70px)"
};

const glowTwo = {
  position: "absolute",
  width: "220px",
  height: "220px",
  borderRadius: "50%",
  background:
    "rgba(99,102,241,0.16)",
  bottom: "40px",
  right: "-40px",
  filter: "blur(70px)"
};

export default App;