"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Briefcase, MessageCircle, Star, ArrowUpRight, CheckCircle2, ChevronRight, Zap, Target, Link2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { user } = useAuth();
  
  // Mock data for the activity scrubber
  const activityDots = Array(30).fill(0).map((_, i) => {
    const isHighActivity = i % 4 === 0;
    const isMediumActivity = i % 2 === 0;
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
          <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-primary)" }}>Trending Skill</span>
          <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px" }}>Meta Ads demand is up 12%</p>
        </div>
      </motion.div>

      {/* 1. Hero Row */}
      <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <h1 className="font-serif-display" style={{ fontSize: "40px", letterSpacing: "-0.02em", color: "var(--text-primary)", lineHeight: 1.1 }}>
          Hello, {user?.dbName?.split(' ')[0] || "Freelancer"}
        </h1>
        
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <div className="badge-outline">
            <span style={{ marginRight: "6px", color: "var(--text-primary)" }}>Profile Views</span>
            <span className="font-dot-matrix" style={{ fontSize: "14px", color: "var(--text-primary)" }}>128</span>
          </div>
          <div className="badge-outline">
            <span style={{ marginRight: "6px", color: "var(--text-primary)" }}>Active Gigs</span>
            <span className="font-dot-matrix" style={{ fontSize: "14px", color: "var(--text-primary)" }}>2</span>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginLeft: "24px" }}>
            <span style={{ fontSize: "11px", color: "var(--text-secondary)", marginRight: "8px", fontWeight: 500 }}>30 DAY ACTIVITY</span>
            {activityDots}
          </div>
        </div>
      </section>

      {/* 2. Primary Stat Row */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }}>
        {/* Card 1: Primary Gradient (Match Score) */}
        <div className="bento-card card-gradient-primary" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "220px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>Match Score</span>
              <Target size={20} color="rgba(255,255,255,0.8)" />
            </div>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginTop: "4px" }}>Relevance to open jobs</p>
          </div>
          <div>
            <div className="font-dot-matrix" style={{ fontSize: "64px", lineHeight: 1, letterSpacing: "-0.04em" }}>84</div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px" }}>
              <span className="badge-lime">Excellent</span>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>Highly sought after</span>
            </div>
          </div>
        </div>

        {/* Card 2: Secondary Gradient (Avg Response Time) */}
        <div className="bento-card card-gradient-secondary" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "220px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>Response Time</span>
              <Zap size={20} color="rgba(255,255,255,0.8)" />
            </div>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginTop: "4px" }}>Average reply speed</p>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <div className="font-dot-matrix" style={{ fontSize: "64px", lineHeight: 1, letterSpacing: "-0.04em" }}>2.4</div>
              <span style={{ fontSize: "18px", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>hours</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px" }}>
              <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.2)", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{ width: "70%", height: "100%", background: "#fff", borderRadius: "2px" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Pink CTA Card */}
        <div className="bento-card card-gradient-cta" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "220px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>Sync Analytics</span>
              <div style={{ width: "32px", height: "32px", background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link2 size={16} color="#fff" />
              </div>
            </div>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", marginTop: "12px", lineHeight: 1.4 }}>
              Connect your Meta Business Account to verify your portfolio and boost your Match Score.
            </p>
          </div>
          <button className="btn-pill" style={{ width: "100%", background: "#fff", color: "#DD4F92" }}>Connect Meta</button>
        </div>
      </section>

      {/* 3. Secondary Grid (Performance Metrics) */}
      <section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
          <h2 className="font-serif-display" style={{ fontSize: "24px", color: "var(--text-primary)" }}>My Performance</h2>
          <button className="btn-pill-secondary" style={{ border: "none" }}>Details <ChevronRight size={14} style={{ display: "inline", verticalAlign: "middle" }} /></button>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {[
            { label: "Client Satisfaction", value: "98", unit: "%", icon: <MessageCircle size={16} /> },
            { label: "Completion Rate", value: "95", unit: "%", icon: <CheckCircle2 size={16} /> },
            { label: "Repeat Clients", value: "8", unit: "", icon: <Briefcase size={16} /> },
            { label: "Avg Rating", value: "4.8", unit: "", icon: <Star size={16} /> }
          ].map((stat, i) => (
            <div key={i} className="bento-card-small" style={{ background: "var(--surface)", boxShadow: "var(--soft-shadow)", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                {stat.icon}
                {/* Tiny sparkline mock */}
                <div style={{ display: "flex", gap: "2px", alignItems: "flex-end", height: "16px" }}>
                  {[6, 5, 8, 10, 14, 12].map((h, j) => (
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

    </div>
  );
}
