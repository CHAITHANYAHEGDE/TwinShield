import pandas as pd

from window_builder import WindowBuilder
from risk_timeline import RiskTimeline
from prepare_training_data import prepare_training_data
from train_forecaster import TrainForecaster

df = pd.read_csv(
    "/Users/chaithanyahegde/IDS_Research/dataset/Data.csv"
)

windows = WindowBuilder().create_windows(
    df,
    window_size=10000
)

timeline = RiskTimeline().build(windows)

X, y = prepare_training_data(timeline)

model, mae = TrainForecaster().train(X, y)

print("MAE:", mae)
