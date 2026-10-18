import { useRef, useState } from "react";

function FileUpload({
  handleFileChange
}) {
  const inputRef =
    useRef(null);

  const [fileName, setFileName] =
    useState("");

  const openPicker = () => {
    inputRef.current.click();
  };

  const onChangeFile = (e) => {
  const file =
    e.target.files[0];

  if (file) {
    setFileName(
      file.name
    );
  }

  handleFileChange(e);

  setTimeout(() => {
    setFileName("");

    if (inputRef.current) {
      inputRef.current.value =
        "";
    }
  }, 700);
};

  const removeFile = () => {
    setFileName("");

    if (inputRef.current) {
      inputRef.current.value =
        "";
    }
  };

  return (
    <div
      style={{
        marginBottom: "14px"
      }}
    >
      <input
        ref={inputRef}
        type="file"
        onChange={
          onChangeFile
        }
        style={{
          display: "none"
        }}
      />

      <div
        onClick={openPicker}
        style={uploadBox}
      >
        <div
          style={{
            fontSize: "28px",
            marginBottom: "6px"
          }}
        >
          +
        </div>

        <div
          style={{
            fontWeight: "700"
          }}
        >
          Upload File
        </div>

        <div
          style={{
            fontSize: "13px",
            opacity: 0.75,
            marginTop: "4px"
          }}
        >
          Click to choose file
        </div>
      </div>

      {fileName && (
        <div style={fileRow}>
          <span
  style={{
    color: "#111827",
    fontWeight: "600",
    wordBreak: "break-all"
  }}
>
  {fileName}
</span>
          <button
            onClick={
              removeFile
            }
            style={deleteBtn}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

const uploadBox = {
  width: "200px",
  height: "200px",
  margin: "0 auto",
  border: "2px dashed #3b82f6",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  cursor: "pointer",
  background:
    "rgba(59,130,246,0.06)",
  boxSizing: "border-box"
};

const fileRow = {
  marginTop: "10px",
  padding: "10px 14px",
  borderRadius: "14px",
  background: "#f8fafc",
  display: "flex",
  justifyContent:
    "space-between",
  alignItems: "center",
  gap: "10px"
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

export default FileUpload;