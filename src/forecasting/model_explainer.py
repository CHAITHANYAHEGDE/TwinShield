class ModelExplainer:

    def __init__(self, model, feature_names):

        self.model = model
        self.feature_names = feature_names

    def explain(self):

        importances = self.model.feature_importances_

        results = []

        for feature, importance in zip(
                self.feature_names,
                importances):

            results.append(
                (feature, importance)
            )

        results.sort(
            key=lambda x: x[1],
            reverse=True
        )

        return results
