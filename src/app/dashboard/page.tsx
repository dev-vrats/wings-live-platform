"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardRedirect() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (user.role === "CLIENT") {
        router.push("/client/dashboard");
      } else if (user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        // Fallback
        router.push("/login");
      }
    }
  }, [user, loading, router]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", background: "#0a0a0a", color: "rgba(255,255,255,0.5)" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        <div style={{ width: "24px", height: "24px", border: "2px solid rgba(255,255,255,0.1)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        <p style={{ fontSize: "14px", letterSpacing: "0.05em" }}>ROUTING...</p>
      </div>
    </div>
  );
}
