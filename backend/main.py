from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI(title="TwinShield AI Prediction Engine")

# FIXES CORS: Allows your Vite app on port 5173 to fetch data safely
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    """Fixes the {"detail":"Not Found"} error on the landing port index."""
    return {"status": "online", "engine": "TwinShield ML Inference Core Active"}

@app.get("/predict")
def predict(scenario: str = Query(..., description="The chosen cyber attack scenario cluster")):
    normalized = scenario.strip()
    
    if normalized == "Normal":
        return {
            "risk": 25,
            "future_risk": 30,
            "alert_level": "LOW",
            "root_cause": "NORMAL TRAFFIC",
            "flow_rate": 14,
            "confidence": 98.4,
            "explanation": "Network profile baselines match standard clean organizational constraints across tracking ports.",
            "weights": [
                {"label": "Flow Rate", "weight": "0%", "raw": 0},
                {"label": "Duration", "weight": "0%", "raw": 0},
                {"label": "Active Time", "weight": "0%", "raw": 0},
                {"label": "Packet Size", "weight": "0%", "raw": 0}
            ],
            "events": [
                "10:15:01 Core Infrastructure Stable",
                "10:15:10 Zero Deviations Detected",
                "10:15:20 Network Topology Healthy"
            ]
        }
        
    elif normalized == "DDoS":
        return {
            "risk": 91,
            "future_risk": 96,
            "alert_level": "CRITICAL",
            "root_cause": "FLOW RATE",
            "flow_rate": 89,
            "confidence": 92.1,
            "explanation": "High frequency payload spikes saturating edge network endpoints indicate active distributed service denial strain.",
            "weights": [
                {"label": "Flow Rate", "weight": "+74%", "raw": 74},
                {"label": "Duration", "weight": "+18%", "raw": 18},
                {"label": "Active Time", "weight": "+5%", "raw": 5},
                {"label": "Packet Size", "weight": "+3%", "raw": 3}
            ],
            "events": [
                "10:16:01 Traffic Spike Flagged",
                "10:16:10 Gateway Ingress Overload",
                "10:16:18 DDoS Pattern Detected",
                "10:16:25 AI Mitigation Vector Suggested"
            ]
        }
        
    elif normalized == "Data Exfiltration":
        return {
            "risk": 88,
            "future_risk": 92,
            "alert_level": "HIGH",
            "root_cause": "PACKET SIZE",
            "flow_rate": 34,
            "confidence": 94.7,
            "explanation": "Large outbound payloads and sustained connections indicate possible data extraction footprints.",
            "weights": [
                {"label": "Packet Size", "weight": "+68%", "raw": 68},
                {"label": "Duration", "weight": "+22%", "raw": 22},
                {"label": "Active Time", "weight": "+7%", "raw": 7},
                {"label": "Flow Rate", "weight": "+3%", "raw": 3}
            ],
            "events": [
                "10:17:02 Suspicious Egress Connection Transfer",
                "10:17:12 Anomalous Data Leak Signature Match",
                "10:17:22 Large Payload Spikes Detected"
            ]
        }
        
    elif normalized == "Botnet":
        return {
            "risk": 92,
            "future_risk": 95,
            "alert_level": "HIGH",
            "root_cause": "ACTIVE TIME",
            "flow_rate": 52,
            "confidence": 89.3,
            "explanation": "Repeated beaconing targets coordinated with blacklisted external proxy systems verify structural lifecycle ingestion.",
            "weights": [
                {"label": "Active Time", "weight": "+61%", "raw": 61},
                {"label": "Duration", "weight": "+24%", "raw": 24},
                {"label": "Flow Rate", "weight": "+10%", "raw": 10},
                {"label": "Packet Size", "weight": "+5%", "raw": 5}
            ],
            "events": [
                "10:18:01 C2 Bot Activity Flags Tripped",
                "10:18:15 Multiple Compromised Vector Nodes Found",
                "10:18:24 Command Signaling Execution Confirmed"
            ]
        }
    
    # Dynamic generation fallback for unidentified scenario types
    return {
        "risk": random.randint(40, 70),
        "future_risk": random.randint(50, 80),
        "alert_level": "WARNING",
        "root_cause": "UNKNOWN VARIANT",
        "flow_rate": random.randint(30, 60),
        "confidence": 85.0,
        "explanation": f"Dynamic evaluations continuing for context: {normalized}.",
        "weights": [
            {"label": "Flow Rate", "weight": "+25%", "raw": 25},
            {"label": "Duration", "weight": "+25%", "raw": 25},
            {"label": "Active Time", "weight": "+25%", "raw": 25},
            {"label": "Packet Size", "weight": "+25%", "raw": 25}
        ],
        "events": ["System analyzing customized scenario vectors..."]
    }
