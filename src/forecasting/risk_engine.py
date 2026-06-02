class RiskEngine:

    def calculate_risk(self, state):

        score = 0

        if state["avg_flow_rate"] > 10000:
            score += 30

        if state["avg_packet_size"] > 100:
            score += 20

        if state["avg_active_time"] > 10000:
            score += 25

        if state["avg_flow_duration"] > 500000:
            score += 25

        return min(score, 100)
