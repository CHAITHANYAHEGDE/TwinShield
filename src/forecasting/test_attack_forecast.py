from attack_forecaster import AttackForecaster

forecaster = AttackForecaster()

risk_history = [
    45,
    52,
    61,
    74,
    82
]

for score in risk_history:
    forecaster.add_risk_score(score)

result = forecaster.forecast()

print(result)
