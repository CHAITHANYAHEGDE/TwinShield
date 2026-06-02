import sys
import os
import pandas as pd

sys.path.append(
    os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..")
    )
)

from twin.network_state import NetworkState
from risk_engine import RiskEngine

df = pd.read_csv(
    "/Users/chaithanyahegde/IDS_Research/dataset/Data.csv"
)

state = NetworkState(df).snapshot()

risk = RiskEngine().calculate_risk(state)

print("Network State:")
print(state)

print("\nCurrent Risk Score:", risk)
