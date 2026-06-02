def prepare_training_data(df):

    X = df[
        [
            "avg_flow_duration",
            "avg_packet_size",
            "avg_flow_rate",
            "avg_active_time"
        ]
    ][:-1]

    y = df["risk"][1:]

    return X, y
