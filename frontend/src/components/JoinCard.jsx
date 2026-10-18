function JoinCard({
  darkMode,
  subText,
  roomCode,
  handleRoomBox,
  handleBackspace,
  labelStyle,
  roomGrid,
  roomBox,
  inputStyle,
  deviceName,
  setDeviceName,
  joinBtn,
  joinRoom,
  pillWrap,
  pill,
  badgeStyle
}) {
  return (
    <>
      <div style={badgeStyle}>
        Fast • Secure • Cross Device
      </div>

      <h2
        style={{
          fontSize: "34px",
          marginBottom: "12px",
          lineHeight: "1.2"
        }}
      >
        Move text, files & code
        <br />
        between devices instantly.
      </h2>

      <p
        style={{
          color: subText,
          lineHeight: "1.7",
          marginBottom: "28px"
        }}
      >
        Connect your phone, laptop or tablet
        using a simple room code in seconds.
        No signup. No waiting.
      </p>

      <div style={pillWrap}>
        <div style={pill(darkMode)}>
          ⚡ Instant Share
        </div>

        <div style={pill(darkMode)}>
          🔢 Room Code Join
        </div>

        <div style={pill(darkMode)}>
          📁 File Transfer
        </div>
      </div>

      <div style={{ marginTop: "28px" }}>
        <div style={labelStyle}>
          Room Code
        </div>

        <div style={roomGrid}>
          {roomCode.map(
            (digit, index) => (
              <input
                key={index}
                id={`room-${index}`}
                type="text"
                value={digit}
                maxLength="1"
                onChange={(e) =>
                  handleRoomBox(
                    index,
                    e.target.value
                  )
                }
                onKeyDown={(e) =>
                  handleBackspace(
                    index,
                    e
                  )
                }
                style={roomBox(darkMode)}
              />
            )
          )}
        </div>

        <div style={labelStyle}>
          Device Name
        </div>
<input
  type="text"
  placeholder="For ex: My Laptop"
  value={deviceName}
  onChange={(e) =>
    setDeviceName(
      e.target.value.replace(
        /[^a-zA-Z\s]/g,
        ""
      )
    )
  }
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      joinRoom();
    }
  }}
  style={inputStyle}
/>

        <button
          onClick={joinRoom}
          style={joinBtn}
        >
          Join Room →
        </button>
      </div>
    </>
  );
}

export default JoinCard;