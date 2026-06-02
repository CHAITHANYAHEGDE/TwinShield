import plotly.graph_objects as go

fig = go.Figure()

fig.add_trace(
    go.Indicator(
        mode="gauge+number",
        value=85,
        title={"text": "Predicted Future Risk"}
    )
)

fig.write_html(
    "dashboard.html"
)

print(
    "Dashboard saved as dashboard.html"
)
