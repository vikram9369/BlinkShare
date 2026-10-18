function Footer({ subText }) {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "28px",
        color: subText,
        lineHeight: "1.9",
        fontSize: "14px"
      }}
    >
      <div>
        Developed by Vikram Kushwaha
      </div>

      <a
        href="https://github.com/Vikram9369"
        target="_blank"
        rel="noreferrer"
        style={{
          color: "#2563eb",
          textDecoration: "none",
          fontWeight: "700"
        }}
      >
        Visit GitHub ↗
      </a>
    </div>
  );
}

export default Footer;