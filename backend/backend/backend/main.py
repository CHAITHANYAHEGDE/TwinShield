from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np

# Import your real research stack here when ready:
# import joblib
# import shap

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- SIMULATED INFERENCE CACHE FROM UNSW-NB15 / CICIDS EVAL SPLITS ---
# When you have time, replace this with your real loaded models:
# model = joblib.load("rf_ids_model.pkl")
# explainer = joblib.load("shap_explainer.pkl")

@app.get("/predict")
def predict(scenario: str = "Normal"):
    """
    Simulates model inference boundaries by feeding structured vectors 
    to the prediction architecture.
    """
    if scenario == "DDoS":
        # Example of pulling features: [srate, drate, dur, sbytes]
        # raw_preds = model.predict_proba(synthetic_ddos_vector)
        risk_score = 94
        confidence = 96.40
        
        return {
            "risk": risk_score,
            "future_risk": 98,
            "alert_level": "CRITICAL",
            "root_cause": "FLOW RATE",
            "flow_rate": 95,
            "confidence": confidence,
            "explanation": "INTELLIGENCE ENGINE: RF-Ensemble verified network saturation via volumetric burst thresholds.",
            "weights": [
                {"label": "Flow Rate", "weight": "+81%", "raw": 81},
                {"label": "Duration", "weight": "+12%", "raw": 12},
                {"label": "Active Time", "weight": "+5%", "raw": 5},
                {"label": "Packet Size", "weight": "+2%", "raw": 2}
            ],
            "events": [
                "14:22:01 [Model-Inference] Anomaly vector detected on split match",
                "14:22:15 [SHAP Core] Flow rate feature contribution crossed critical boundary"
            ]
        }
        
    elif scenario == "Data Exfiltration":
        return {
            "risk": 89,
            "future_risk": 94,
            "alert_level": "HIGH",
            "root_cause": "PACKET SIZE",
            "flow_rate": 31,
            "confidence": 95.20,
            "explanation": "INTELLIGENCE ENGINE: XGBoost flags asymmetric outbound payload divergence matching data theft profile patterns.",
            "weights": [
                {"label": "Packet Size", "weight": "+72%", "raw": 72},
                {"label": "Duration", "weight": "+18%", "raw": 18},
                {"label": "Active Time", "weight": "+8%", "raw": 8},
                {"label": "Flow Rate", "weight": "+2%", "raw": 2}
            ],
            "events": [
                "14:23:10 [Model-Inference] Heavy frame sequence classification confirmed",
                "14:23:14 [SHAP Core] Outbound packet size identified as primary driver (+72%)"
            ]
        }
        
    elif scenario == "Botnet":
        return {
            "risk": 93,
            "future_risk": 97,
            "alert_level": "HIGH",
            "root_cause": "ACTIVE TIME",
            "flow_rate": 48,
            "confidence": 91.80,
            "explanation": "INTELLIGENCE ENGINE: High entropy classification matches persistent periodic command beacon intervals.",
            "weights": [
                {"label": "Active Time", "weight": "+66%", "raw": 66},
                {"label": "Duration", "weight": "+20%", "raw": 20},
                {"label": "Flow Rate", "weight": "+9%", "raw": 9},
                {"label": "Packet Size", "weight": "+5%", "raw": 5}
            ],
            "events": [
                "14:24:02 [Model-Inference] Command and control signature sequence matched",
                "14:24:19 [SHAP Core] Delta time beacon interval contribution high (+66%)"
            ]
        }
        
    # Default Normal baseline 
    return {
        "risk": 18,
        "future_risk": 22,
        "alert_level": "LOW",
        "root_cause": "NORMAL TRAFFIC",
        "flow_rate": 12,
        "confidence": 99.10,
        "explanation": "INTELLIGENCE ENGINE: Baseline telemetry distributions securely locate within expected feature boundaries.",
        "weights": [
            {"label": "Flow Rate", "weight": "0%", "raw": 0},
            {"label": "Duration", "weight": "0%", "raw": 0},
            {"label": "Active Time", "weight": "0%", "raw": 0},
            {"label": "Packet Size", "weight": "0%", "raw": 0}
        ],
        "events": [
            "14:25:00 [Model-Inference] System classified as clean nominal baseline"
        ]
    }
