import pandas as pd

class WindowBuilder:

    def create_windows(self, df, window_size=10000):

        windows = []

        for i in range(0, len(df), window_size):

            chunk = df.iloc[i:i+window_size]

            if len(chunk) == 0:
                continue

            state = {
                "avg_flow_duration": chunk["Flow Duration"].mean(),
                "avg_packet_size": chunk["Average Packet Size"].mean(),
                "avg_flow_rate": chunk["Flow Packets/s"].mean(),
                "avg_active_time": chunk["Active Mean"].mean()
            }

            windows.append(state)

        return pd.DataFrame(windows)
