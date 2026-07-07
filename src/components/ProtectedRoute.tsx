"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode, allowedRole?: "CLIENT" | "ADMIN" }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (allowedRole && user.role !== allowedRole) {
        router.push("/dashboard"); // Router will handle putting them in the right place
      }
    }
  }, [user, loading, allowedRole, router]);

  if (loading) {
    return <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>Loading...</div>;
  }

  if (!user || (allowedRole && user.role !== allowedRole)) {
    return null; // Will be redirected
  }

  return <>{children}</>;
}
