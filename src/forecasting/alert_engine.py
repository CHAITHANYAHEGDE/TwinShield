class AlertEngine:

    def generate_alert(self, future_risk):

        if future_risk >= 80:
            return "CRITICAL"

        elif future_risk >= 60:
            return "HIGH"

        elif future_risk >= 40:
            return "MEDIUM"

        else:
            return "LOW"
