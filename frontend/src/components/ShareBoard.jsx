import MessageCard from "./MessageCard";
import FileUpload from "./FileUpload";
import FileCard from "./FileCard";

function ShareBoard({
  currentRoom,
  deviceName,
  subText,
  badgeStyle,
  actionWrap,
  smallBtnRed,
  clearBoard,
  chatBox,
  messages,
  copyText,
  lastUpdated,
  textareaStyle,
  messageText,
  setMessageText,
  joinBtn,
  sendMessage,
  leaveBtn,
  leaveRoom,
  files,
  setFiles,
  handleFileChange
}) {
  return (
    <>
      <div style={badgeStyle}>
        Room: {currentRoom}
      </div>

      <h2 style={{ marginTop: 0 }}>
        Connected as {deviceName}
      </h2>

      <p
        style={{
          color: subText,
          marginBottom: "18px"
        }}
      >
        Share text instantly
      </p>

      <div style={actionWrap}>
        <button
          onClick={clearBoard}
          style={smallBtnRed}
        >
          Clear Board
        </button>
      </div>

      <div style={chatBox}>
        {messages.length === 0 ? (
          <div style={{ color: subText }}>
            No shared content yet
          </div>
        ) : (
          messages.map(
            (msg, index) => (
              <MessageCard
                key={index}
                msg={msg}
                copyText={copyText}
              />
            )
          )
        )}
      </div>

      {lastUpdated && (
        <p
          style={{
            color: subText,
            fontSize: "13px",
            marginBottom: "10px"
          }}
        >
          Last Updated: {lastUpdated}
        </p>
      )}
      <FileUpload
  handleFileChange={
    handleFileChange
  }
/>
{files.length > 0 &&
  files.map(
    (file, index) => (
      <FileCard
        key={index}
        file={file}
        removeFile={() =>
          setFiles(
            files.filter(
              (_, i) =>
                i !== index
            )
          )
        }
      />
    )
  )}

     <textarea
        placeholder="Paste text, code or notes..."
        value={messageText}
        onChange={(e) =>
          setMessageText(
            e.target.value
          )
        }
        rows="6"
        style={textareaStyle}
      />

      <button
        onClick={sendMessage}
        style={joinBtn}
      >
        Share Instantly
      </button>

      <button
        onClick={leaveRoom}
        style={leaveBtn}
      >
        Leave Room
      </button>
    </>
  );
}

export default ShareBoard;