import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import {
  FaShieldAlt,
  FaRobot,
  FaExclamationTriangle,
  FaChartLine,
  FaSlidersH,
  FaNetworkWired,
  FaClock,
  FaBrain,
  FaToggleOn,
  FaToggleOff,
  FaLightbulb
} from "react-icons/fa";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from "recharts";

// ================= COMPONENT: DETERMINISTIC 3D NEURAL TWIN =================
function AdvancedTwinTopology({ riskLevel, currentScenario, onSelectNode }) {
  const groupRef = useRef();
  const nodeCount = 45;

  // Uses deterministic math structures to avoid re-randomizing positions on frame updates
  const baseNodes = useMemo(() => {
    const temp = [];
    const names = ["Gateway-Alpha", "DB-Cluster-01", "Auth-Server", "Edge-Router-B", "K8s-Proxy", "User-Vault", "SIEM-Ingest"];
    
    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.25; 
      
      temp.push({
        id: i,
        name: names[i % names.length] + `-[#${1000 + i}]`,
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        ],
        isTarget: i % 8 === 1
      });
    }
    return temp;
  }, [nodeCount]);

  // Compute dynamic attack states mapping on top of static positions
  const nodes = useMemo(() => {
    return baseNodes.map(node => {
      let isInfected = false;
      if (currentScenario === "DDoS" && node.id % 5 === 0) isInfected = true;
      if (currentScenario === "Data Exfiltration" && node.id % 7 === 0) isInfected = true;
      if (currentScenario === "Botnet" && node.id % 4 === 0) isInfected = true;
      if (currentScenario === "Normal" || currentScenario === "Mitigated") isInfected = false;

      return {
        ...node,
        isInfected,
        latency: isInfected ? Math.round(140 + Math.random() * 80) : Math.round(12 + Math.random() * 25)
      };
    });
  }, [baseNodes, currentScenario]);

  useFrame((state) => {
    if (groupRef.current) {
      const targetSpeed = riskLevel > 80 ? 0.35 : 0.12;
      groupRef.current.rotation.y = state.clock.getElapsedTime() * targetSpeed;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.04) * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[1.22, 16, 16]}>
        <meshBasicMaterial color="#06B6D4" wireframe transparent opacity={0.02} />
      </Sphere>

      {nodes.map((node, i) => {
        const color = node.isInfected ? "#EF4444" : node.isTarget ? "#7C3AED" : "#06B6D4";
        const size = node.isInfected ? 0.075 : 0.04;

        return (
          <group 
            key={i} 
            position={node.position}
            onClick={(e) => {
              e.stopPropagation();
              onSelectNode(node);
            }}
          >
            <mesh>
              <sphereGeometry args={[size, 16, 16]} />
              <meshBasicMaterial color={color} />
            </mesh>
            
            {node.isInfected && (
              <mesh>
                <sphereGeometry args={[size * 2.4, 16, 16]} />
                <meshBasicMaterial color="#EF4444" wireframe transparent opacity={0.18} />
              </mesh>
            )}
          </group>
        );
      })}

      <points rotation={[0.5, 0.5, 0.5]}>
        <sphereGeometry args={[1.28, 40, 20]} />
        <pointsMaterial 
          color={riskLevel > 80 ? "#EF4444" : "#22C55E"} 
          size={0.016} 
          transparent 
          opacity={0.35} 
          blending={THREE.AdditiveBlending}
        />
      </points>

      <ambientLight intensity={1.6} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#7C3AED" />
    </group>
  );
}

// ================= MAIN COMMAND INTELLIGENCE ENGINE =================
export default function App() {
  const [scenario, setScenario] = useState("DDoS");
  const [isLiveApi, setIsLiveApi] = useState(false); 
  const [apiError, setApiError] = useState(null);

  const [currentRisk, setCurrentRisk] = useState(91);
  const [futureRisk, setFutureRisk] = useState(96);
  const [alertLevel, setAlertLevel] = useState("CRITICAL");
  const [rootCause, setRootCause] = useState("FLOW RATE");
  const [flowRate, setFlowRate] = useState(89);
  const [liveConfidence, setLiveConfidence] = useState(92.1);
  const [systemTime, setSystemTime] = useState("");
  const [selectedNode, setSelectedNode] = useState(null);

  const [explanationReason, setExplanationReason] = useState("High frequency payload spikes saturating edge network endpoints indicate active distributed service denial strain.");
  const [attributionWeights, setAttributionWeights] = useState([
    { label: "Flow Rate", weight: "+74%", raw: 74 },
    { label: "Duration", weight: "+18%", raw: 18 },
    { label: "Active Time", weight: "+5%", raw: 5 },
    { label: "Packet Size", weight: "+3%", raw: 3 }
  ]);

  const [events, setEvents] = useState([
    "10:16:01 Traffic Spike Flagged",
    "10:16:10 Gateway Ingress Overload",
    "10:16:18 DDoS Pattern Detected",
    "10:16:25 AI Mitigation Vector Suggested"
  ]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const now = new Date();
      setSystemTime(now.toISOString().substr(11, 8));
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  // When user toggles the switch, automatically re-fetch or re-apply current scenario logic
  useEffect(() => {
    loadScenario(scenario);
  }, [isLiveApi]);

  const colors = {
    bg: "#070B14",
    cardBg: "#0F172A",
    cardBorder: "rgba(255, 255, 255, 0.04)",
    textMuted: "#64748B",
    textLight: "#E2E8F0",
    primary: "#7C3AED",   
    secondary: "#06B6D4", 
    danger: "#EF4444",    
    warning: "#F59E0B",   
    accent: "#10B981"     
  };

  const localDatabase = {
    Normal: {
      currentRisk: 25, futureRisk: 30, alertLevel: "LOW", rootCause: "NORMAL TRAFFIC", flowRate: 14, confidence: 98.4,
      reason: "Network profile baselines match standard clean organizational constraints across tracking ports.",
      weights: [{ label: "Flow Rate", weight: "0%", raw: 0 }, { label: "Duration", weight: "0%", raw: 0 }, { label: "Active Time", weight: "0%", raw: 0 }, { label: "Packet Size", weight: "0%", raw: 0 }],
      events: ["10:15:01 Core Infrastructure Stable", "10:15:10 Zero Deviations Detected", "10:15:20 Network Topology Healthy"]
    },
    DDoS: {
      currentRisk: 91, futureRisk: 96, alertLevel: "CRITICAL", rootCause: "FLOW RATE", flowRate: 89, confidence: 92.1,
      reason: "High frequency payload spikes saturating edge network endpoints indicate active distributed service denial strain.",
      weights: [{ label: "Flow Rate", weight: "+74%", raw: 74 }, { label: "Duration", weight: "+18%", raw: 18 }, { label: "Active Time", weight: "+5%", raw: 5 }, { label: "Packet Size", weight: "+3%", raw: 3 }],
      events: ["10:16:01 Traffic Spike Flagged", "10:16:10 Gateway Ingress Overload", "10:16:18 DDoS Pattern Detected", "10:16:25 AI Mitigation Vector Suggested"]
    },
    "Data Exfiltration": {
      currentRisk: 88, futureRisk: 92, alertLevel: "HIGH", rootCause: "PACKET SIZE", flowRate: 34, confidence: 94.7,
      reason: "Large outbound payloads and sustained connections indicate possible data extraction footprints.",
      weights: [{ label: "Packet Size", weight: "+68%", raw: 68 }, { label: "Duration", weight: "+22%", raw: 22 }, { label: "Active Time", weight: "+7%", raw: 7 }, { label: "Flow Rate", weight: "+3%", raw: 3 }],
      events: ["10:17:02 Suspicious Egress Connection Transfer", "10:17:12 Anomalous Data Leak Signature Match", "10:17:22 Large Payload Spikes Detected"]
    },
    Botnet: {
      currentRisk: 92, futureRisk: 95, alertLevel: "HIGH", rootCause: "ACTIVE TIME", flowRate: 52, confidence: 89.3,
      reason: "Repeated beaconing targets coordinated with blacklisted external proxy systems verify structural lifecycle ingestion.",
      weights: [{ label: "Active Time", weight: "+61%", raw: 61 }, { label: "Duration", weight: "+24%", raw: 24 }, { label: "Flow Rate", weight: "+10%", raw: 10 }, { label: "Packet Size", weight: "+5%", raw: 5 }],
      events: ["10:18:01 C2 Bot Activity Flags Tripped", "10:18:15 Multiple Compromised Vector Nodes Found", "10:18:24 Command Signaling Execution Confirmed"]
    }
  };

  // Direct Connection Interface Hook for ML Backend Engine APIs
  async function loadScenario(type) {
    setScenario(type);
    setSelectedNode(null);
    setApiError(null);

    if (isLiveApi) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/predict?scenario=${encodeURIComponent(type)}`);
        if (!response.ok) throw new Error("Connection failed");
        const data = await response.json();
        
        setCurrentRisk(data.risk);
        setFutureRisk(data.future_risk);
        setAlertLevel(data.alert_level);
        setRootCause(data.root_cause);
        setFlowRate(data.flow_rate);
        setLiveConfidence(data.confidence);
        setExplanationReason(data.explanation);
        setAttributionWeights(data.weights);
        setEvents(data.events || [`Telemetry update parsed for: ${type}`]);
      } catch (err) {
        setApiError("Backend API Unreachable. Auto-fallback deployed.");
        applyLocalPreset(type);
      }
    } else {
      applyLocalPreset(type);
    }
  }

  function applyLocalPreset(type) {
    const target = localDatabase[type];
    if (!target) return;
    setCurrentRisk(target.currentRisk);
    setFutureRisk(target.futureRisk);
    setAlertLevel(target.alertLevel);
    setRootCause(target.rootCause);
    setFlowRate(target.flowRate);
    setLiveConfidence(target.confidence);
    setExplanationReason(target.reason);
    setAttributionWeights(target.weights);
    setEvents(target.events);
  }

  // Dynamic Relative Mitigation Index Scaler Engine
  function applyMitigation() {
    setScenario("Mitigated");
    setAlertLevel("LOW");
    setLiveConfidence(98.0);
    setExplanationReason("AI Adaptive Mitigation executed relative to running threshold indexes. Network sandboxes active.");
    
    setCurrentRisk(prev => Math.max(prev - 35, 20));
    setFutureRisk(prev => Math.max(prev - 40, 15));

    setAttributionWeights([
      { label: "Mitigation Rule", weight: "-54%", raw: 10 },
      { label: "Flow Throttle", weight: "-22%", raw: 15 },
      { label: "Node Isolation", weight: "-15%", raw: 8 },
      { label: "Baseline Recovery", weight: "-9%", raw: 5 }
    ]);

    setEvents((prev) => [
      ...prev,
      `${systemTime || "10:19:00"} [AI Mitigation] Activated Layer-7 mitigation rules`,
      `${systemTime || "10:19:05"} [Traffic Control] Active gateway ingress throttled`,
      `${systemTime || "10:19:12"} [SIEM Core] Anomaly signal trends terminated`
    ]);
  }

  const cards = [
    { title: "Current Risk Status", value: `${currentRisk}%`, icon: <FaShieldAlt />, color: currentRisk > 80 ? colors.danger : currentRisk > 40 ? colors.warning : colors.secondary, desc: "Live topology anomaly index" },
    { title: "Future Risk Forecast", value: `${futureRisk}%`, icon: <FaChartLine />, color: colors.primary, desc: "ML Predicted max vector (60m)" },
    { title: "System Alert Level", value: alertLevel, icon: <FaExclamationTriangle />, color: alertLevel === "CRITICAL" ? colors.danger : alertLevel === "HIGH" ? colors.warning : colors.accent, desc: "Automated trigger verification" },
    { title: "Primary Root Cause", value: rootCause, icon: <FaRobot />, color: colors.warning, desc: `Feature Drift Factor Weight` }
  ];

  const featureData = attributionWeights.map(w => ({
    name: w.label,
    value: w.raw,
    color: w.weight.startsWith("-") ? colors.accent : colors.primary
  }));

  const threatMetrics = [
    { subject: "Payload Vol", A: currentRisk - 4 },
    { subject: "Velocity", A: futureRisk },
    { subject: "Frequency", A: scenario === "DDoS" ? 94 : 52 },
    { subject: "Entropy", A: scenario === "Data Exfiltration" ? 91 : 42 },
    { subject: "Divergence", A: currentRisk > 50 ? currentRisk - 10 : 30 }
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: colors.bg, backgroundImage: "radial-gradient(circle at 50% 0%, #0d1526 0%, #070B14 75%)", color: "white", padding: "30px 40px", fontFamily: "'Inter', system-ui, sans-serif", boxSizing: "border-box" }}>
      
      {/* ================= HEADER STRIP ================= */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "25px" }}>
        <motion.h1 initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: "3rem", fontWeight: "900", letterSpacing: "-0.5px", marginBottom: "2px", background: `linear-gradient(135deg, #FFFFFF 40%, ${colors.primary} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          TwinShield AI
        </motion.h1>

        <div style={{ width: "100%", overflow: "visible", marginBottom: "16px" }}>
          <TypeAnimation sequence={["Autonomous Threat Forecasting Digital Twin", 4000, "Real-Time Cyber Risk Intelligence Platform", 4000]} repeat={Infinity} style={{ color: colors.textMuted, fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase", fontWeight: "600" }} />
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", flexWrap: "wrap", background: "rgba(15, 23, 42, 0.6)", padding: "8px 24px", borderRadius: "30px", border: `1px solid ${colors.cardBorder}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "8px", height: "8px", backgroundColor: currentRisk > 80 ? colors.danger : colors.accent, borderRadius: "50%", display: "inline-block", boxShadow: `0 0 10px ${currentRisk > 80 ? colors.danger : colors.accent}` }} />
            <span style={{ fontSize: "0.75rem", color: currentRisk > 80 ? colors.danger : colors.accent, fontWeight: "700", letterSpacing: "0.5px" }}>
              {currentRisk > 80 ? "ANOMALY ACTIVITY DETECTED" : "LIVE SYSTEM ACTIVE"}
            </span>
          </div>
          <div style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.1)" }} />
          <div style={{ fontSize: "0.75rem", color: colors.textLight, display: "flex", alignItems: "center", gap: "6px" }}>
            <FaBrain style={{ color: colors.primary }} /> <span>CONFIDENCE: <strong style={{ color: colors.secondary, fontFamily: "monospace" }}>{liveConfidence}%</strong></span>
          </div>
          <div style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.1)" }} />
          <div style={{ fontSize: "0.75rem", color: colors.textLight }}>
            ACTIVE VECTOR NODES: <strong style={{ color: "#FFFFFF" }}>45 / 45</strong>
          </div>
          <div style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.1)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: colors.textMuted, fontSize: "0.75rem" }}>
            <FaClock style={{ color: colors.secondary }} />
            <span>TIMESTAMP: <strong style={{ color: "#FFFFFF", fontFamily: "monospace" }}>{systemTime || "15:03:20"} UTC</strong></span>
          </div>
          
          <div style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.1)" }} />
          <div onClick={() => setIsLiveApi(!isLiveApi)} style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "0.75rem", fontWeight: "700", color: isLiveApi ? colors.accent : colors.textMuted }}>
            {isLiveApi ? <FaToggleOn style={{ fontSize: "1.1rem", color: colors.accent }} /> : <FaToggleOff style={{ fontSize: "1.1rem" }} />}
            <span>LIVE API CONNECTION</span>
          </div>
        </div>
        {apiError && <div style={{ color: colors.warning, fontSize: "0.7rem", marginTop: "8px", fontFamily: "monospace" }}>⚠️ {apiError}</div>}
      </div>

      {/* ================= SCENARIO CONSOLE CONTROL CENTER ================= */}
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "30px", flexWrap: "wrap", background: "rgba(15, 23, 42, 0.4)", padding: "12px", borderRadius: "14px", border: `1px solid ${colors.cardBorder}` }}>
        {["Normal", "DDoS", "Data Exfiltration", "Botnet"].map((item) => (
          <button key={item} onClick={() => loadScenario(item)} style={{ padding: "10px 20px", background: scenario === item ? "rgba(124, 58, 237, 0.2)" : "rgba(255,255,255,0.02)", color: scenario === item ? "#FFF" : colors.textLight, border: `1px solid ${scenario === item ? colors.primary : "rgba(255,255,255,0.05)"}`, borderRadius: "10px", cursor: "pointer", fontWeight: "700", fontSize: "0.8rem", transition: "all 0.2s ease", boxShadow: scenario === item ? `0 0 15px rgba(124, 58, 237, 0.25)` : "none" }}>
            {item}
          </button>
        ))}
      </div>

      {/* ================= METRIC CARDS ROW ================= */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        {cards.map((card, index) => (
          <div key={index} style={{ backgroundColor: colors.cardBg, borderRadius: "14px", padding: "22px 24px", border: `1px solid ${colors.cardBorder}`, boxShadow: "0 12px 30px -12px rgba(0,0,0,0.5)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "3px", background: card.color }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ color: colors.textMuted, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" }}>{card.title}</span>
              <div style={{ color: card.color, fontSize: "1.05rem" }}>{card.icon}</div>
            </div>
            <AnimatePresence mode="popLayout">
              <motion.div key={card.value} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }} style={{ fontSize: "2.3rem", fontWeight: "800", marginBottom: "4px", color: "#FFFFFF", letterSpacing: "-0.5px" }}>
                {card.value}
              </motion.div>
            </AnimatePresence>
            <span style={{ color: colors.textMuted, fontSize: "0.72rem" }}>{card.desc}</span>
          </div>
        ))}
      </div>

      {/* ================= CANVAS / PERFORMANCE VISUALS MIDSECTION ================= */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 0.9fr", gap: "20px", marginBottom: "20px" }}>
        <div style={{ backgroundColor: colors.cardBg, borderRadius: "16px", padding: "24px", border: `1px solid ${colors.cardBorder}` }}>
          <h3 style={{ fontSize: "0.85rem", color: colors.textLight, margin: "0 0 20px 0", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>Vector Metrics</h3>
          <div style={{ width: "100%", height: "240px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" radius="72%" data={threatMetrics}>
                <PolarGrid stroke="rgba(255,255,255,0.03)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748B", fontSize: 10, fontWeight: 600 }} />
                <Radar name="Risk" dataKey="A" stroke={colors.primary} strokeWidth={2} fill={colors.primary} fillOpacity={0.12} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ backgroundColor: colors.cardBg, borderRadius: "16px", padding: "24px", border: `1px solid ${colors.cardBorder}`, position: "relative", height: "288px" }}>
          <div style={{ position: "absolute", top: "24px", left: "24px", zIndex: 10 }}>
            <h3 style={{ fontSize: "0.85rem", color: colors.textLight, textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700", margin: 0 }}>Neural Twin Core</h3>
            <span style={{ color: colors.secondary, fontSize: "0.7rem", display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
              <span style={{ width: "6px", height: "6px", background: colors.secondary, borderRadius: "50%", display: "inline-block" }} /> Interlocking Nodes Stable
            </span>
          </div>

          <AnimatePresence>
            {selectedNode ? (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} style={{ position: "absolute", top: "24px", right: "24px", zIndex: 10, background: "rgba(15, 23, 42, 0.95)", border: `1px solid ${selectedNode.isInfected ? colors.danger : colors.secondary}`, borderRadius: "8px", padding: "10px 14px", minWidth: "160px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "#FFFFFF" }}>{selectedNode.name}</span>
                  <button onClick={() => setSelectedNode(null)} style={{ background: "none", border: "none", color: colors.textMuted, cursor: "pointer", fontSize: "0.75rem" }}>✕</button>
                </div>
                <div style={{ fontSize: "0.65rem", color: colors.textMuted }}>STATUS: <span style={{ color: selectedNode.isInfected ? colors.danger : colors.accent, fontWeight: "700" }}>{selectedNode.isInfected ? "COMPROMISED" : "SECURE"}</span></div>
                <div style={{ fontSize: "0.65rem", color: colors.textMuted, marginTop: "2px" }}>LATENCY: <span style={{ color: "#FFF", fontFamily: "monospace" }}>{selectedNode.latency}ms</span></div>
              </motion.div>
            ) : (
              <div style={{ position: "absolute", bottom: "20px", left: "24px", zIndex: 10, fontSize: "0.65rem", color: colors.textMuted }}>
                💡 Target topology preserves deterministic coordinates across switching logic cycles.
              </div>
            )}
          </AnimatePresence>

          <div style={{ width: "100%", height: "100%", cursor: "grab" }}>
            <Canvas camera={{ position: [0, 0, 3.1] }}>
              <OrbitControls enableZoom={false} />
              <AdvancedTwinTopology riskLevel={currentRisk} currentScenario={scenario} onSelectNode={setSelectedNode} />
            </Canvas>
          </div>
        </div>

        <div style={{ backgroundColor: colors.cardBg, borderRadius: "16px", padding: "24px", border: `1px solid ${colors.cardBorder}`, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontSize: "0.85rem", color: colors.textLight, margin: "0 0 14px 0", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" }}>Executive Decisions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ background: "rgba(7, 11, 20, 0.4)", border: "1px solid rgba(255,255,255,0.02)", borderRadius: "10px", padding: "10px 14px" }}>
                <div style={{ fontSize: "0.65rem", color: colors.textMuted, fontWeight: "700", textTransform: "uppercase" }}>Forecast Trend</div>
                <div style={{ fontSize: "0.9rem", color: currentRisk > 40 ? colors.danger : colors.accent, fontWeight: "800", marginTop: "2px", display: "flex", alignItems: "center", gap: "6px" }}>
                  {currentRisk > 40 ? "▲ Escalating Anomaly Vectors" : "■ Stable Topology Baseline"}
                </div>
              </div>

              <div style={{ background: "rgba(7, 11, 20, 0.4)", border: "1px solid rgba(255,255,255,0.02)", borderRadius: "10px", padding: "10px 14px" }}>
                <div style={{ fontSize: "0.65rem", color: colors.textMuted, fontWeight: "700", textTransform: "uppercase" }}>Recommended Action</div>
                <div style={{ fontSize: "0.88rem", color: currentRisk > 40 ? colors.warning : colors.accent, fontWeight: "800", marginTop: "2px" }}>
                  {scenario === "Normal" ? "System Monitoring Nominal" : scenario === "Mitigated" ? "Residual Evaluation Active" : "Throttle Network Gateway"}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={applyMitigation}
            disabled={scenario === "Normal" || scenario === "Mitigated"}
            style={{
              width: "100%", padding: "12px",
              background: scenario === "Normal" || scenario === "Mitigated" ? "#1e293b" : `linear-gradient(135deg, ${colors.accent} 0%, #059669 100%)`,
              border: "none", borderRadius: "10px",
              color: scenario === "Normal" || scenario === "Mitigated" ? "#64748B" : "white",
              fontWeight: "700", fontSize: "0.8rem",
              cursor: scenario === "Normal" || scenario === "Mitigated" ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              boxShadow: scenario === "Normal" || scenario === "Mitigated" ? "none" : "0 4px 12px rgba(16, 185, 129, 0.2)"
            }}
          >
            {scenario === "Mitigated" ? "Mitigation Active" : "Apply AI Mitigation"}
          </button>
        </div>
      </div>

      {/* ================= ACCELERATED DEEP EXPLANATION FOOTER LAYER ================= */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.1fr 0.9fr", gap: "20px" }}>
        <div style={{ backgroundColor: colors.cardBg, borderRadius: "16px", padding: "20px", border: `1px solid ${colors.cardBorder}` }}>
          <h3 style={{ fontSize: "0.85rem", color: colors.textLight, margin: "0 0 15px 0", display: "flex", alignItems: "center", gap: "8px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" }}><FaNetworkWired style={{ color: colors.secondary }} /> Threat Propagation Mapping</h3>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "180px", background: "#070B14", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.01)" }}>
            <svg width="100%" height="100%" viewBox="0 0 400 180">
              <line x1="60" y1="90" x2="160" y2="40" stroke={scenario === "Normal" || scenario === "Mitigated" ? "rgba(255,255,255,0.05)" : "rgba(239, 68, 68, 0.15)"} strokeWidth="2" />
              <line x1="60" y1="90" x2="160" y2="140" stroke="rgba(34, 197, 94, 0.15)" strokeWidth="1.5" />
              <line x1="160" y1="40" x2="300" y2="90" stroke={scenario === "Normal" || scenario === "Mitigated" ? "rgba(255,255,255,0.05)" : "rgba(239, 68, 68, 0.15)"} strokeWidth="2" />
              {scenario !== "Normal" && scenario !== "Mitigated" && (
                <>
                  <motion.circle r="3" fill={colors.danger} animate={{ cx: [60, 160], cy: [90, 40] }} transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }} />
                  <motion.circle r="3" fill={colors.danger} animate={{ cx: [160, 300], cy: [40, 90] }} transition={{ repeat: Infinity, duration: 1.0, ease: "linear", delay: 0.3 }} />
                </>
              )}
              <motion.circle r="2.5" fill="#10B981" animate={{ cx: [60, 160], cy: [90, 140] }} transition={{ repeat: Infinity, duration: 2.0, ease: "linear" }} />
              <circle cx="60" cy="90" r="9" fill={colors.secondary} />    
              <circle cx="160" cy="40" r="11" fill={scenario === "Normal" || scenario === "Mitigated" ? colors.secondary : colors.danger} />  
              <circle cx="160" cy="140" r="9" fill="#3B82F6" opacity={0.6} /> 
              <circle cx="300" cy="90" r="9" fill={colors.primary} />  
            </svg>
          </div>
        </div>

        <div style={{ backgroundColor: colors.cardBg, borderRadius: "16px", padding: "20px", border: `1px solid ${colors.cardBorder}` }}>
          <h3 style={{ fontSize: "0.85rem", color: colors.textLight, margin: "0 0 15px 0", display: "flex", alignItems: "center", gap: "8px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" }}><FaSlidersH style={{ color: colors.primary }} /> SHAP Impact Attribution</h3>
          <div style={{ width: "100%", height: "180px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" stroke="#475569" fontSize={10} width={70} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#0F172A", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px" }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={10}>
                  {featureData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI EXPLANATION CORE MATRIX FIELD */}
        <div style={{ backgroundColor: colors.cardBg, borderRadius: "16px", padding: "20px", border: `1px solid ${colors.cardBorder}`, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontSize: "0.85rem", color: colors.textLight, margin: "0 0 10px 0", display: "flex", alignItems: "center", gap: "8px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" }}>
              <FaLightbulb style={{ color: colors.warning }} /> AI Explanation Engine
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginBottom: "10px" }}>
              {attributionWeights.map((item, idx) => (
                <div key={idx} style={{ background: "rgba(7, 11, 20, 0.4)", padding: "6px 10px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.02)" }}>
                  <div style={{ fontSize: "0.58rem", color: colors.textMuted, textTransform: "uppercase", fontWeight: "600" }}>{item.label}</div>
                  <div style={{ fontSize: "0.78rem", color: item.weight.startsWith("-") ? colors.accent : scenario === "Normal" ? colors.textMuted : colors.danger, fontWeight: "700" }}>{item.weight}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "rgba(7, 11, 20, 0.6)", padding: "10px", borderRadius: "8px", borderLeft: `2px solid ${scenario === "Mitigated" ? colors.accent : scenario === "Normal" ? colors.secondary : colors.warning}` }}>
            <div style={{ fontSize: "0.6rem", color: colors.textMuted, fontWeight: "700", textTransform: "uppercase", marginBottom: "2px" }}>Model Inference Log:</div>
            <p style={{ margin: 0, fontSize: "0.7rem", color: colors.textLight, lineHeight: "1.4" }}>{explanationReason}</p>
          </div>
        </div>

        <div style={{ backgroundColor: colors.cardBg, borderRadius: "16px", padding: "20px", border: `1px solid ${colors.cardBorder}`, display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontSize: "0.85rem", color: colors.textLight, margin: "0 0 12px 0", display: "flex", alignItems: "center", gap: "8px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" }}>
            <FaClock style={{ color: colors.secondary }} /> Live Event Feed
          </h3>
          <div style={{ flexGrow: 1, background: "#070B14", borderRadius: "10px", padding: "12px", overflowY: "auto", maxHeight: "135px", fontFamily: "monospace", fontSize: "0.7rem", lineHeight: "1.5", border: "1px solid rgba(255,255,255,0.01)" }}>
            {events.map((event, i) => (
              <div key={i} style={{ marginBottom: "6px", color: event.includes("Mitigation") || event.includes("Control") ? colors.accent : event.includes("Spike") || event.includes("Overload") || event.includes("Detected") ? colors.danger : colors.textLight }}>
                {event}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
} 