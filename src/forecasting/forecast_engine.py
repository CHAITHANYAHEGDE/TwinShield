class ForecastEngine:

    def forecast(self, features):

        score = 0

        score += min(features["flow_rate"] / 200, 40)

        score += min(features["packet_size"] / 10, 20)

        score += min(features["active_time"] / 1000, 20)

        score += min(features["flow_duration"] / 50000, 20)

        future_risk = min(score, 100)

        return round(future_risk, 2)
