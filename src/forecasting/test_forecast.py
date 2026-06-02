import sys
import os
import pandas as pd

sys.path.append(
    os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..")
    )
)

from twin.network_state import NetworkState
from feature_builder import FeatureBuilder
from forecast_engine import ForecastEngine

df = pd.read_csv(
    "/Users/chaithanyahegde/IDS_Research/dataset/Data.csv"
)

state = NetworkState(df).snapshot()

features = FeatureBuilder().build_features(state)

future_risk = ForecastEngine().forecast(features)

print("Current State")
print(state)

print("\nForecast Features")
print(features)

print("\nPredicted Future Risk:", future_risk)
