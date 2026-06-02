from root_cause import RootCauseDetector

feature_importances = {

    "avg_flow_duration": 0.216075,

    "avg_packet_size": 0.056396,

    "avg_flow_rate": 0.653194,

    "avg_active_time": 0.074335
}

detector = RootCauseDetector(
    feature_importances
)

result = detector.find_root_cause()

print(result)
