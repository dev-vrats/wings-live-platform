"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"CLIENT" | "ADMIN">("CLIENT");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Create profile in our database
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          firebaseUid: user.uid,
          name, 
          email, 
          role 
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Database registration failed");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <motion.div
        className="bento-card"
        style={{ width: "100%", maxWidth: "460px", padding: "40px 32px" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 className="font-serif-display" style={{ fontSize: "32px", color: "var(--text-primary)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            Join Wings
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
            Create an account to get started
          </p>
        </div>

        {error && (
          <div style={{ background: "rgba(221, 79, 146, 0.1)", color: "#DD4F92", padding: "12px", borderRadius: "12px", fontSize: "13px", marginBottom: "24px", textAlign: "center", fontWeight: 500 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div style={{ display: "flex", gap: "8px", marginBottom: "4px", background: "rgba(0,0,0,0.03)", padding: "6px", borderRadius: "9999px" }}>
            <button
              type="button"
              onClick={() => setRole("CLIENT")}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "9999px",
                border: "none",
                background: role === "CLIENT" ? "#fff" : "transparent",
                color: role === "CLIENT" ? "var(--text-primary)" : "var(--text-secondary)",
                boxShadow: role === "CLIENT" ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 200ms ease"
              }}
            >
              I want to hire
            </button>
            <button
              type="button"
              onClick={() => setRole("ADMIN")}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "9999px",
                border: "none",
                background: role === "ADMIN" ? "#fff" : "transparent",
                color: role === "ADMIN" ? "var(--text-primary)" : "var(--text-secondary)",
                boxShadow: role === "ADMIN" ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 200ms ease"
              }}
            >
              I am a freelancer
            </button>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px", letterSpacing: "0.02em" }}>FULL NAME</label>
            <input type="text" required className="input-pill" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px", letterSpacing: "0.02em" }}>EMAIL</label>
            <input type="email" required className="input-pill" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px", letterSpacing: "0.02em" }}>PASSWORD</label>
            <input type="password" required className="input-pill" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <button type="submit" className="btn-pill" style={{ marginTop: "12px", padding: "14px" }} disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div style={{ marginTop: "32px", textAlign: "center", fontSize: "14px", color: "var(--text-secondary)" }}>
          Already have an account? <Link href="/login" style={{ color: "var(--text-primary)", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
        </div>
      </motion.div>
    </div>
  );
}
