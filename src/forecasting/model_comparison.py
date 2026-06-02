from sklearn.ensemble import (
    RandomForestRegressor,
    GradientBoostingRegressor
)

from sklearn.model_selection import train_test_split

from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)

import pandas as pd


class ModelComparison:

    def compare(self, X, y):

        X_train, X_test, y_train, y_test = train_test_split(
            X,
            y,
            test_size=0.2,
            random_state=42
        )

        models = {
            "RandomForest":
                RandomForestRegressor(
                    n_estimators=100,
                    random_state=42
                ),

            "GradientBoosting":
                GradientBoostingRegressor(
                    random_state=42
                )
        }

        results = []

        for name, model in models.items():

            model.fit(
                X_train,
                y_train
            )

            pred = model.predict(
                X_test
            )

            mae = mean_absolute_error(
                y_test,
                pred
            )

            rmse = mean_squared_error(
                y_test,
                pred
            ) ** 0.5

            r2 = r2_score(
                y_test,
                pred
            )

            results.append(
                [
                    name,
                    round(mae, 2),
                    round(rmse, 2),
                    round(r2, 3)
                ]
            )

        return pd.DataFrame(
            results,
            columns=[
                "Model",
                "MAE",
                "RMSE",
                "R2"
            ]
        )
