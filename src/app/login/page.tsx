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
        className="bento-card"
        style={{ width: "100%", maxWidth: "420px", padding: "40px 32px" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 className="font-serif-display" style={{ fontSize: "32px", color: "var(--text-primary)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            Welcome back
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
            Sign in to your Wings account
          </p>
        </div>

        {error && (
          <div style={{ background: "rgba(221, 79, 146, 0.1)", color: "#DD4F92", padding: "12px", borderRadius: "12px", fontSize: "13px", marginBottom: "24px", textAlign: "center", fontWeight: 500 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px", letterSpacing: "0.02em" }}>EMAIL</label>
            <input
              type="email"
              required
              className="input-pill"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px", letterSpacing: "0.02em" }}>PASSWORD</label>
            <input
              type="password"
              required
              className="input-pill"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn-pill" style={{ marginTop: "12px", padding: "14px" }} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={{ marginTop: "32px", textAlign: "center", fontSize: "14px", color: "var(--text-secondary)" }}>
          Don't have an account? <Link href="/signup" style={{ color: "var(--text-primary)", fontWeight: 600, textDecoration: "none" }}>Sign up</Link>
        </div>
      </motion.div>
    </div>
  );
}
