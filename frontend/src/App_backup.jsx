import { motion } from "framer-motion";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 50% 15%, rgba(124,58,237,.15), transparent 35%), radial-gradient(circle at 80% 70%, rgba(6,182,212,.10), transparent 40%), #030712",
        color: "white",
        padding: "40px",
        fontFamily: "Inter, sans-serif"
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          textAlign: "center",
          fontSize: "5rem",
          fontWeight: "900",
          letterSpacing: "6px",
          marginBottom: "10px"
        }}
      >
        TWINSHIELD AI
      </motion.h1>

      <div
        style={{
          textAlign: "center",
          color: "#94A3B8",
          fontSize: "1.2rem",
          marginBottom: "50px"
        }}
      >
        Autonomous Threat Intelligence Platform
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "24px",
          marginBottom: "30px"
        }}
      >
        {[
          ["Current Risk", "85"],
          ["Future Risk", "92"],
          ["Alert", "CRITICAL"],
          ["Root Cause", "Flow Rate"]
        ].map((item) => (
          <div
            key={item[0]}
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: "24px",
              padding: "24px",
              backdropFilter: "blur(16px)"
            }}
          >
            <div
              style={{
                color: "#94A3B8",
                marginBottom: "12px"
              }}
            >
              {item[0]}
            </div>

            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "700"
              }}
            >
              {item[1]}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px"
        }}
      >
        <div
          style={{
            height: "450px",
            borderRadius: "24px",
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.08)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem"
          }}
        >
          3D Digital Twin (Next Stage)
        </div>

        <div
          style={{
            height: "450px",
            borderRadius: "24px",
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.08)",
            padding: "24px"
          }}
        >
          <h2>AI Insights</h2>

          <p>Forecast Confidence: 91%</p>
          <p>Primary Driver: Flow Rate</p>
          <p>Alert Level: Critical</p>
          <p>Predicted Escalation: +15 min</p>
        </div>
      </div>
    </div>
  );
}
