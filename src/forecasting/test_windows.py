import pandas as pd
from window_builder import WindowBuilder

df = pd.read_csv(
    "/Users/chaithanyahegde/IDS_Research/dataset/Data.csv"
)

builder = WindowBuilder()

windows = builder.create_windows(
    df,
    window_size=10000
)

print(windows.head())

print("\nNumber of Windows:")
print(len(windows))
