import pandas as pd

class FeatureImportance:

    def extract(self, model, X):

        importance = pd.DataFrame(
            {
                "Feature": X.columns,
                "Importance": model.feature_importances_
            }
        )

        importance = importance.sort_values(
            by="Importance",
            ascending=False
        )

        return importance
