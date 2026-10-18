function Header({
  darkMode,
  toggleTheme,
  subText
}) {
  return (
    <div style={navStyle}>
      <div>
        <h1 style={logoStyle}>
          BlinkShare ⚡
        </h1>

        <p
          style={{
            margin: "6px 0 0",
            color: subText,
            fontSize: "14px"
          }}
        >
          Instant Sharing. Zero Hassle.
        </p>
      </div>

      <button
        onClick={toggleTheme}
        style={themeBtn}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </div>
  );
}

const navStyle = {
  display: "flex",
  justifyContent:
    "space-between",
  alignItems: "center",
  gap: "20px",
  marginBottom: "26px",
  flexWrap: "wrap"
};

const logoStyle = {
  margin: 0,
  fontSize: "32px",
  fontWeight: "800",
  color: "#2563eb"
};

const themeBtn = {
  border: "none",
  padding: "12px",
  borderRadius: "14px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "700"
};

export default Header;