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
        className="glass-card-static"
        style={{ width: "100%", maxWidth: "440px", padding: "40px 32px" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#fff", marginBottom: "8px", textAlign: "center" }}>
          Join WINGS
        </h1>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", textAlign: "center", marginBottom: "32px" }}>
          Create an account to get started
        </p>

        {error && (
          <div style={{ background: "rgba(255,0,0,0.1)", border: "1px solid rgba(255,0,0,0.2)", color: "#ff8a8a", padding: "10px", borderRadius: "8px", fontSize: "13px", marginBottom: "20px", textAlign: "center", wordWrap: "break-word" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          
          <div style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
            <button
              type="button"
              onClick={() => setRole("CLIENT")}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "10px",
                border: role === "CLIENT" ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(255,255,255,0.1)",
                background: role === "CLIENT" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.02)",
                color: role === "CLIENT" ? "#fff" : "rgba(255,255,255,0.5)",
                fontSize: "13px",
                fontWeight: 500,
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
                padding: "12px",
                borderRadius: "10px",
                border: role === "ADMIN" ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(255,255,255,0.1)",
                background: role === "ADMIN" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.02)",
                color: role === "ADMIN" ? "#fff" : "rgba(255,255,255,0.5)",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 200ms ease"
              }}
            >
              I am a freelancer
            </button>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>FULL NAME</label>
            <input type="text" required className="input-glass" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>EMAIL</label>
            <input type="email" required className="input-glass" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>PASSWORD</label>
            <input type="password" required className="input-glass" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: "12px" }} disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
          Already have an account? <Link href="/login" style={{ color: "#fff", fontWeight: 500 }}>Sign in</Link>
        </div>
      </motion.div>
    </div>
  );
}
