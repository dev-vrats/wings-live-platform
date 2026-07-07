import Link from "next/link";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", alignItems: "center", justifyContent: "center", padding: "20px", background: "radial-gradient(ellipse at 50% 0%, #111111 0%, #0a0a0a 70%)" }}>
      <div className="glass-card-static" style={{ maxWidth: "600px", width: "100%", padding: "60px 40px", textAlign: "center" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 700, color: "#fff", marginBottom: "16px", letterSpacing: "0.05em" }}>
          WINGS AutoPilot
        </h1>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", marginBottom: "40px", lineHeight: 1.6 }}>
          The premier AI-powered marketplace connecting digital growth experts with businesses ready to scale.
        </p>
        
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/login" className="btn-glass" style={{ padding: "12px 32px", fontSize: "15px", textDecoration: "none" }}>
            Sign In
          </Link>
          <Link href="/signup" className="btn-primary" style={{ padding: "12px 32px", fontSize: "15px", textDecoration: "none" }}>
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
