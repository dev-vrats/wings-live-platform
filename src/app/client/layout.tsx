"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Home, Search, PlusCircle, Bell, User, X } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<"find" | "bookings">("find");
  const [showUpsell, setShowUpsell] = useState(true);

  return (
    <ProtectedRoute allowedRole="CLIENT">
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
              onClick={() => setActiveTab("find")}
              style={{
                flex: 1, padding: "8px 0", borderRadius: "9999px",
                background: activeTab === "find" ? "var(--surface)" : "transparent",
                boxShadow: activeTab === "find" ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
                border: "none", color: activeTab === "find" ? "var(--text-primary)" : "var(--text-secondary)",
                fontWeight: 500, fontSize: "13px", cursor: "pointer", transition: "all 200ms ease"
              }}
            >
              Find Work
            </button>
            <button 
              onClick={() => setActiveTab("bookings")}
              style={{
                flex: 1, padding: "8px 0", borderRadius: "9999px",
                background: activeTab === "bookings" ? "var(--surface)" : "transparent",
                boxShadow: activeTab === "bookings" ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
                border: "none", color: activeTab === "bookings" ? "var(--text-primary)" : "var(--text-secondary)",
                fontWeight: 500, fontSize: "13px", cursor: "pointer", transition: "all 200ms ease"
              }}
            >
              My Bookings
            </button>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
            <Link href="/client/dashboard" className={`nav-pill ${pathname === "/client/dashboard" ? "active" : ""}`}>
              <Home size={18} /> Dashboard
            </Link>
            <Link href="/client/search" className={`nav-pill ${pathname === "/client/search" ? "active" : ""}`}>
              <Search size={18} /> Find Freelancers
              <span style={{ marginLeft: "auto", background: "rgba(0,0,0,0.05)", padding: "2px 8px", borderRadius: "9999px", fontSize: "11px", fontWeight: 600 }}>12 new</span>
            </Link>
            <Link href="/client/post-job" className={`nav-pill ${pathname === "/client/post-job" ? "active" : ""}`}>
              <PlusCircle size={18} /> Post a Job
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
              <h4 style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>Get a Verified Badge</h4>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", marginBottom: "12px", lineHeight: 1.4 }}>Stand out to top talent by verifying your business.</p>
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
