function MessageCard({
  msg,
  copyText
}) {
  return (
    <div style={msgBubble}>
      <div
        style={{
          fontWeight: "700",
          marginBottom: "6px"
        }}
      >
        {msg.sender}
      </div>

      <div
        style={{
          whiteSpace: "pre-wrap",
          fontFamily:
            "Consolas, monospace",
          marginBottom: "10px"
        }}
      >
        {msg.text}
      </div>

      <div style={msgFooter}>
        <small
          style={{
            opacity: 0.85
          }}
        >
          {msg.time}
        </small>

        <button
          onClick={() =>
            copyText(msg.text)
          }
          style={copyBtn}
        >
          Copy Content
        </button>
      </div>
    </div>
  );
}

const msgBubble = {
  padding: "12px",
  borderRadius: "14px",
  background: "#2563eb",
  color: "white",
  marginBottom: "10px"
};

const msgFooter = {
  display: "flex",
  justifyContent:
    "space-between",
  alignItems: "center",
  gap: "10px",
  marginTop: "10px"
};

const copyBtn = {
  border: "none",
  padding: "8px 12px",
  borderRadius: "10px",
  background: "white",
  color: "#2563eb",
  fontWeight: "700",
  cursor: "pointer",
  fontSize: "12px"
};

export default MessageCard;