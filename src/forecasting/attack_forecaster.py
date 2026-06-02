import numpy as np

class AttackForecaster:

    def __init__(self):
        self.history = []

    def add_risk_score(self, score):
        self.history.append(score)

    def forecast(self):

        if len(self.history) < 3:
            return {
                "future_risk": self.history[-1],
                "trend": "INSUFFICIENT_DATA"
            }

        trend = np.polyfit(
            range(len(self.history)),
            self.history,
            1
        )[0]

        future_risk = self.history[-1] + trend * 3

        future_risk = max(
            0,
            min(100, future_risk)
        )

        if trend > 0:
            trend_label = "RISING"
        elif trend < 0:
            trend_label = "FALLING"
        else:
            trend_label = "STABLE"

        return {
            "future_risk": round(future_risk, 2),
            "trend": trend_label
        }
