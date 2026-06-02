from risk_engine import RiskEngine

class RiskTimeline:

    def build(self, windows):

        engine = RiskEngine()

        risks = []

        for _, row in windows.iterrows():

            state = {
                "avg_flow_duration": row["avg_flow_duration"],
                "avg_packet_size": row["avg_packet_size"],
                "avg_flow_rate": row["avg_flow_rate"],
                "avg_active_time": row["avg_active_time"]
            }

            risk = engine.calculate_risk(state)

            risks.append(risk)

        windows["risk"] = risks

        return windows

