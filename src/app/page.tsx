import Link from "next/link";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div className="bento-card" style={{ maxWidth: "600px", width: "100%", padding: "60px 40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
        
        <div style={{ padding: "8px 16px", background: "rgba(0,0,0,0.04)", borderRadius: "9999px", color: "var(--text-secondary)", fontSize: "13px", fontWeight: 500, letterSpacing: "0.02em" }}>
          Welcome to the new era of work
        </div>

        <h1 className="font-serif-display" style={{ fontSize: "48px", color: "var(--text-primary)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          Wings.
        </h1>
        
        <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "420px", margin: "0 auto" }}>
          The premier AI-powered marketplace connecting digital growth experts with businesses ready to scale.
        </p>
        
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginTop: "16px", width: "100%" }}>
          <Link href="/login" className="btn-pill-secondary" style={{ padding: "12px 32px", fontSize: "15px", textDecoration: "none", flex: 1, textAlign: "center" }}>
            Sign In
          </Link>
          <Link href="/signup" className="btn-pill" style={{ padding: "12px 32px", fontSize: "15px", textDecoration: "none", flex: 1, textAlign: "center" }}>
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
