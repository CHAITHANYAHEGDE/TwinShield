class RootCauseDetector:

    def __init__(self, feature_importances):
        self.feature_importances = feature_importances

    def find_root_cause(self):

        max_feature = max(
            self.feature_importances,
            key=self.feature_importances.get
        )

        return {
            "feature": max_feature,
            "importance":
            round(
                self.feature_importances[max_feature] * 100,
                2
            )
        }
