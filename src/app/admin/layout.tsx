"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, LayoutDashboard, Briefcase, UserCircle, Bell, User, X } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<"dashboard" | "gigs">("dashboard");
  const [showUpsell, setShowUpsell] = useState(true);

  return (
    <ProtectedRoute allowedRole="ADMIN">
      <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--bg-base)" }}>
        
        {/* Sidebar */}
        <aside style={{ 
          width: "var(--sidebar-width)", 
          backgroundColor: "transparent", 
          padding: "32px 24px", 
          display: "flex", 
          flexDirection: "column",
          borderRight: "1px solid rgba(0,0,0,0.04)"
        }}>
          
          <div style={{ marginBottom: "40px", padding: "0 8px" }}>
            <div className="font-serif-display" style={{ fontSize: "24px", color: "var(--text-primary)" }}>
              Wings.
            </div>
          </div>

          {/* Tab Switcher */}
          <div style={{ 
            display: "flex", 
            background: "rgba(0,0,0,0.04)", 
            borderRadius: "9999px", 
            padding: "4px", 
            marginBottom: "32px" 
          }}>
            <button 
              onClick={() => setActiveTab("dashboard")}
              style={{
                flex: 1, padding: "8px 0", borderRadius: "9999px",
                background: activeTab === "dashboard" ? "var(--surface)" : "transparent",
                boxShadow: activeTab === "dashboard" ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
                border: "none", color: activeTab === "dashboard" ? "var(--text-primary)" : "var(--text-secondary)",
                fontWeight: 500, fontSize: "13px", cursor: "pointer", transition: "all 200ms ease"
              }}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab("gigs")}
              style={{
                flex: 1, padding: "8px 0", borderRadius: "9999px",
                background: activeTab === "gigs" ? "var(--surface)" : "transparent",
                boxShadow: activeTab === "gigs" ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
                border: "none", color: activeTab === "gigs" ? "var(--text-primary)" : "var(--text-secondary)",
                fontWeight: 500, fontSize: "13px", cursor: "pointer", transition: "all 200ms ease"
              }}
            >
              My Gigs
            </button>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
            <Link href="/admin/dashboard" className={`nav-pill ${pathname === "/admin/dashboard" ? "active" : ""}`}>
              <LayoutDashboard size={18} /> Overview
            </Link>
            <Link href="/admin/jobs" className={`nav-pill ${pathname === "/admin/jobs" ? "active" : ""}`}>
              <Briefcase size={18} /> Find Jobs
              <span style={{ marginLeft: "auto", background: "rgba(0,0,0,0.05)", padding: "2px 8px", borderRadius: "9999px", fontSize: "11px", fontWeight: 600 }}>5 new</span>
            </Link>
            <Link href="/admin/profile" className={`nav-pill ${pathname === "/admin/profile" ? "active" : ""}`}>
              <UserCircle size={18} /> My Profile
            </Link>
          </nav>

          {showUpsell && (
            <div className="bento-card-small card-gradient-cta" style={{ position: "relative", marginBottom: "16px" }}>
              <button 
                onClick={() => setShowUpsell(false)}
                style={{ position: "absolute", top: "12px", right: "12px", background: "transparent", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer" }}
              >
                <X size={14} />
              </button>
              <h4 style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>Upgrade to Pro</h4>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", marginBottom: "12px", lineHeight: 1.4 }}>Get featured placement in client search results.</p>
              <button className="btn-pill" style={{ background: "#FFFFFF", color: "#DD4F92", width: "100%", padding: "8px" }}>Try it</button>
            </div>
          )}

          <button onClick={() => { signOut(auth); window.location.href = '/login'; }} className="nav-pill" style={{ border: "none", background: "transparent", cursor: "pointer", color: "rgba(227, 106, 69, 0.8)" }}>
            <LogOut size={18} /> Sign out
          </button>
        </aside>

        {/* Main Content Area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          
          {/* Top Bar */}
          <header style={{ padding: "24px 40px", display: "flex", justifyContent: "flex-end", gap: "16px" }}>
            <button className="bento-card-small" style={{ padding: "12px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", color: "var(--text-secondary)" }}>
              <Bell size={20} />
            </button>
            <button className="bento-card-small" style={{ padding: "12px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", color: "var(--text-secondary)" }}>
              <User size={20} />
            </button>
          </header>

          <main style={{ padding: "0 40px 40px 40px", overflowY: "auto", flex: 1 }}>
            {children}
          </main>
        </div>

      </div>
    </ProtectedRoute>
  );
}
