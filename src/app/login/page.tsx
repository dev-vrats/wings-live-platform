"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
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
        style={{ width: "100%", maxWidth: "400px", padding: "40px 32px" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#fff", marginBottom: "8px", textAlign: "center" }}>
          Welcome back
        </h1>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", textAlign: "center", marginBottom: "32px" }}>
          Sign in to your WINGS account
        </p>

        {error && (
          <div style={{ background: "rgba(255,0,0,0.1)", border: "1px solid rgba(255,0,0,0.2)", color: "#ff8a8a", padding: "10px", borderRadius: "8px", fontSize: "13px", marginBottom: "20px", textAlign: "center", wordWrap: "break-word" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>EMAIL</label>
            <input
              type="email"
              required
              className="input-glass"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>PASSWORD</label>
            <input
              type="password"
              required
              className="input-glass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: "12px" }} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
          Don't have an account? <Link href="/signup" style={{ color: "#fff", fontWeight: 500 }}>Sign up</Link>
        </div>
      </motion.div>
    </div>
  );
}
