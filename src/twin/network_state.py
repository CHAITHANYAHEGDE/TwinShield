import pandas as pd

class NetworkState:

    def __init__(self, df):
        self.df = df

    def snapshot(self):

        state = {
            "total_flows": len(self.df),
            "avg_flow_duration": self.df["Flow Duration"].mean(),
            "avg_packet_size": self.df["Average Packet Size"].mean(),
            "avg_flow_rate": self.df["Flow Packets/s"].mean(),
            "avg_active_time": self.df["Active Mean"].mean()
        }

        return state
