import pandas as pd

from network_state import NetworkState

df = pd.read_csv(
    "/Users/chaithanyahegde/IDS_Research/dataset/Data.csv"
)

twin = NetworkState(df)

print(twin.snapshot())
