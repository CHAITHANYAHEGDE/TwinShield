import pandas as pd

class FeatureBuilder:

    def build_features(self, state):

        features = {
            "flow_duration": state["avg_flow_duration"],
            "packet_size": state["avg_packet_size"],
            "flow_rate": state["avg_flow_rate"],
            "active_time": state["avg_active_time"]
        }

        return features
