import pandas as pd

from window_builder import WindowBuilder
from risk_timeline import RiskTimeline
from prepare_training_data import prepare_training_data
from train_forecaster import TrainForecaster
from model_explainer import ModelExplainer

# Load dataset
df = pd.read_csv(
    "/Users/chaithanyahegde/IDS_Research/dataset/Data.csv"
)

# Create windows
windows = WindowBuilder().create_windows(
    df,
    window_size=10000
)

# Build risk timeline
timeline = RiskTimeline().build(
    windows
)

# Prepare forecasting dataset
X, y = prepare_training_data(
    timeline
)

# Train Random Forest model
trainer = TrainForecaster()

model, mae = trainer.train(
    X,
    y
)

print("MAE:", round(mae, 2))

# Explain model
explainer = ModelExplainer(
    model,
    X.columns.tolist()
)

results = explainer.explain()

print("\nFeature Importance Ranking")

for feature, importance in results:

    print(
        f"{feature}: {round(importance * 100, 2)}%"
    )
