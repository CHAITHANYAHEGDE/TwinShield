import pandas as pd

from window_builder import WindowBuilder
from risk_timeline import RiskTimeline
from plot_timeline import TimelinePlotter

df = pd.read_csv(
    "/Users/chaithanyahegde/IDS_Research/dataset/Data.csv"
)

windows = WindowBuilder().create_windows(
    df,
    window_size=10000
)

timeline = RiskTimeline().build(
    windows
)

TimelinePlotter().plot(
    timeline
)
