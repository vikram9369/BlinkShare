function FileCard({
  file,
  removeFile
}) {
  return (
    <div style={card}>
      <div style={{ flex: 1 }}>
        <div style={nameText}>
          {file.originalName}
        </div>

        <div style={subText}>
          Shared File
        </div>
      </div>

      <div style={btnWrap}>
        <a
          href={
            "http://localhost:5000" +
            file.url
          }
          target="_blank"
          rel="noreferrer"
          style={downloadBtn}
        >
          Download
        </a>

        <button
          onClick={removeFile}
          style={deleteBtn}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

const card = {
  padding: "14px",
  borderRadius: "16px",
  background: "#f8fafc",
  marginBottom: "10px",
  display: "flex",
  alignItems: "center",
  gap: "12px"
};

const nameText = {
  fontWeight: "700",
  color: "#111827",
  wordBreak: "break-all"
};

const subText = {
  fontSize: "12px",
  opacity: 0.7,
  marginTop: "4px"
};

const btnWrap = {
  display: "flex",
  gap: "8px"
};

const downloadBtn = {
  textDecoration: "none",
  padding: "8px 12px",
  borderRadius: "10px",
  background: "#2563eb",
  color: "white",
  fontWeight: "700"
};

const deleteBtn = {
  border: "none",
  padding: "8px 12px",
  borderRadius: "10px",
  background: "#ef4444",
  color: "white",
  cursor: "pointer",
  fontWeight: "700"
};

export default FileCard;