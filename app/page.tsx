export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#080e1a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif",
    }}>
      <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>⚡</div>
        <p style={{ fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Coming Soon
        </p>
      </div>
    </div>
  )
}