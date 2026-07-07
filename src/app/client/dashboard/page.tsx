"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Briefcase, MessageCircle, Star, ArrowUpRight, CheckCircle2, ChevronRight, BarChart3, Clock, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function ClientDashboard() {
  const { user } = useAuth();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Mock data for the activity scrubber
  const activityDots = Array(30).fill(0).map((_, i) => {
    const isHighActivity = i % 5 === 0;
    const isMediumActivity = i % 3 === 0;
    let color = "rgba(0,0,0,0.05)";
    if (isHighActivity) color = "var(--accent-lime)";
    else if (isMediumActivity) color = "#A7AFB6";
    return <span key={i} className="activity-dot" style={{ backgroundColor: color }} />;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px", position: "relative" }}>
      
      {/* Floating Glass Callout (Absolute position over the top section) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="glass-callout"
        style={{ position: "absolute", top: "160px", right: "20px", display: "flex", alignItems: "center", gap: "12px" }}
      >
        <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--accent-lime)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ArrowUpRight size={14} color="#1a1a1a" />
        </div>
        <div>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-primary)" }}>High Engagement</span>
          <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px" }}>+4 proposals this week</p>
        </div>
      </motion.div>

      {/* 1. Hero Row */}
      <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <h1 className="font-serif-display" style={{ fontSize: "40px", letterSpacing: "-0.02em", color: "var(--text-primary)", lineHeight: 1.1 }}>
          Good morning, {user?.dbName?.split(' ')[0] || "Client"}
        </h1>
        
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <div className="badge-outline">
            <span style={{ marginRight: "6px", color: "var(--text-primary)" }}>Active Jobs</span>
            <span className="font-dot-matrix" style={{ fontSize: "14px", color: "var(--text-primary)" }}>3</span>
          </div>
          <div className="badge-outline">
            <span style={{ marginRight: "6px", color: "var(--text-primary)" }}>Unread Messages</span>
            <span className="font-dot-matrix" style={{ fontSize: "14px", color: "var(--text-primary)" }}>14</span>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginLeft: "24px" }}>
            <span style={{ fontSize: "11px", color: "var(--text-secondary)", marginRight: "8px", fontWeight: 500 }}>30 DAY ACTIVITY</span>
            {activityDots}
          </div>
        </div>
      </section>

      {/* 2. Primary Stat Row */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }}>
        {/* Card 1: Primary Gradient (Trust Score) */}
        <div className="bento-card card-gradient-primary" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "220px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>Trust Score</span>
              <Target size={20} color="rgba(255,255,255,0.8)" />
            </div>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginTop: "4px" }}>Based on platform activity</p>
          </div>
          <div>
            <div className="font-dot-matrix" style={{ fontSize: "64px", lineHeight: 1, letterSpacing: "-0.04em" }}>98</div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px" }}>
              <span className="badge-lime">Top 5%</span>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>Highly trusted profile</span>
            </div>
          </div>
        </div>

        {/* Card 2: Secondary Gradient (Deal Velocity) */}
        <div className="bento-card card-gradient-secondary" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "220px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>Deal Velocity</span>
              <Zap size={20} color="rgba(255,255,255,0.8)" />
            </div>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginTop: "4px" }}>Avg time from post to hire</p>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <div className="font-dot-matrix" style={{ fontSize: "64px", lineHeight: 1, letterSpacing: "-0.04em" }}>1.2</div>
              <span style={{ fontSize: "18px", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>days</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px" }}>
              <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.2)", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{ width: "85%", height: "100%", background: "#fff", borderRadius: "2px" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Utility White Card (Pending Action) */}
        <div className="bento-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "220px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Clock size={20} color="var(--text-secondary)" />
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>Awaiting Confirmation</div>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Web Development Project</div>
            </div>
          </div>
          
          <div style={{ background: "rgba(0,0,0,0.02)", borderRadius: "16px", padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-lime)" }} />
              <span style={{ fontSize: "12px", color: "var(--text-primary)", fontWeight: 500 }}>Proposal Accepted</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", border: "2px solid rgba(0,0,0,0.2)" }} />
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Pending Escrow Deposit</span>
            </div>
          </div>

          <button className="btn-pill" style={{ width: "100%" }}>Fund Escrow</button>
        </div>
      </section>

      {/* 3. Secondary Grid (Performance Metrics) */}
      <section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
          <h2 className="font-serif-display" style={{ fontSize: "24px", color: "var(--text-primary)" }}>Platform Metrics</h2>
          <button className="btn-pill-secondary" style={{ border: "none" }}>See All <ChevronRight size={14} style={{ display: "inline", verticalAlign: "middle" }} /></button>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {[
            { label: "Response Rate", value: "94", unit: "%", icon: <MessageCircle size={16} /> },
            { label: "Completion Rate", value: "100", unit: "%", icon: <CheckCircle2 size={16} /> },
            { label: "Repeat Clients", value: "12", unit: "", icon: <Briefcase size={16} /> },
            { label: "Avg Rating", value: "4.9", unit: "", icon: <Star size={16} /> }
          ].map((stat, i) => (
            <div key={i} className="bento-card-small" style={{ background: "var(--surface)", boxShadow: "var(--soft-shadow)", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                {stat.icon}
                {/* Tiny sparkline mock */}
                <div style={{ display: "flex", gap: "2px", alignItems: "flex-end", height: "16px" }}>
                  {[4, 8, 5, 12, 10, 14].map((h, j) => (
                    <div key={j} style={{ width: "3px", height: `${h}px`, background: "rgba(0,0,0,0.1)", borderRadius: "2px" }} />
                  ))}
                </div>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
                  <span className="font-dot-matrix" style={{ fontSize: "32px", lineHeight: 1, color: "var(--text-primary)" }}>{stat.value}</span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-secondary)" }}>{stat.unit}</span>
                </div>
                <div style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)", marginTop: "4px" }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Row */}
      <section style={{ marginBottom: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
          <div>
            <h2 className="font-serif-display" style={{ fontSize: "24px", color: "var(--text-primary)" }}>Recommended Providers Near You</h2>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "4px" }}>Based on your recent search for "Social Media Management"</p>
          </div>
          <button className="btn-pill-secondary" style={{ border: "none" }}>See All <ChevronRight size={14} style={{ display: "inline", verticalAlign: "middle" }} /></button>
        </div>

        <div style={{ display: "flex", gap: "24px", overflowX: "auto", paddingBottom: "24px", margin: "0 -40px", padding: "0 40px 24px 40px" }}>
          {[
            { name: "Elena R.", role: "Brand Strategist", price: "$45/hr", badge: "Top Rated" },
            { name: "Mark T.", role: "Meta Ads Expert", price: "$60/hr", badge: "Fast Responder" },
            { name: "Sarah K.", role: "Content Creator", price: "$35/hr", badge: "Best Value" },
            { name: "James L.", role: "SEO Specialist", price: "$50/hr", badge: "New Pro" }
          ].map((provider, i) => (
            <div 
              key={i} 
              className="bento-card" 
              style={{ 
                minWidth: "280px", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                textAlign: "center",
                gap: "16px"
              }}
              onMouseEnter={() => setHoveredCard(provider.name)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="avatar-glossy" style={{ width: "80px", height: "80px", position: "relative" }}>
                <div style={{ position: "absolute", bottom: "-8px", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
                  <span className="badge-outline" style={{ background: "var(--surface)", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>{provider.badge}</span>
                </div>
              </div>
              
              <div style={{ marginTop: "8px" }}>
                <h3 className="font-serif-display" style={{ fontSize: "18px", color: "var(--text-primary)" }}>{provider.name}</h3>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: 500 }}>{provider.role}</p>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", paddingTop: "16px", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                <span className="font-dot-matrix" style={{ fontSize: "16px", color: "var(--text-primary)" }}>{provider.price}</span>
                <button className="btn-pill-secondary" style={{ 
                  background: hoveredCard === provider.name ? "var(--text-primary)" : "var(--surface)",
                  color: hoveredCard === provider.name ? "#fff" : "var(--text-primary)",
                  padding: "6px 12px",
                  fontSize: "12px"
                }}>
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
