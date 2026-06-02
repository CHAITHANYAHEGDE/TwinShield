from dash import Dash, html, dcc
import dash_bootstrap_components as dbc
import plotly.graph_objects as go
import plotly.express as px
import pandas as pd

app = Dash(
    __name__,
    external_stylesheets=[dbc.themes.CYBORG]
)

# -----------------------------
# GAUGE
# -----------------------------

gauge = go.Figure(go.Indicator(
    mode="gauge+number",
    value=85,

    title={
        "text": "Predicted Threat Level"
    },

    gauge={
        "axis": {"range": [0, 100]},

        "bar": {
            "color": "red"
        },

        "steps": [

            {
                "range": [0, 40],
                "color": "green"
            },

            {
                "range": [40, 70],
                "color": "orange"
            },

            {
                "range": [70, 100],
                "color": "red"
            }
        ]
    }
))

gauge.update_layout(
    paper_bgcolor="#111111",
    font_color="white",
    height=350
)

# -----------------------------
# FEATURE IMPORTANCE
# -----------------------------

importance_df = pd.DataFrame({
    "Feature": [
        "Flow Rate",
        "Flow Duration",
        "Active Time",
        "Packet Size"
    ],
    "Importance": [
        65.3,
        21.6,
        7.4,
        5.6
    ]
})

importance_fig = px.bar(
    importance_df,
    x="Feature",
    y="Importance",
    title="Feature Importance"
)

importance_fig.update_layout(
    template="plotly_dark",
    height=350
)

# -----------------------------
# TIMELINE
# -----------------------------

risk_df = pd.DataFrame({
    "Window": list(range(1, 11)),
    "Risk": [75, 50, 100, 100, 20, 20, 45, 70, 100, 85]
})

timeline_fig = px.line(
    risk_df,
    x="Window",
    y="Risk",
    markers=True,
    title="Risk Timeline"
)

timeline_fig.update_layout(
    template="plotly_dark",
    height=350
)

# -----------------------------
# DASHBOARD
# -----------------------------

app.layout = dbc.Container([

    html.Br(),

    html.H1(
        "TwinShield",
        style={
            "textAlign": "center",
            "fontWeight": "bold"
        }
    ),

    html.H4(
        "AI-Powered Network Digital Twin",
        style={
            "textAlign": "center",
            "color": "#00ffcc"
        }
    ),

    html.Br(),

    dbc.Row([

        dbc.Col(
            dbc.Card(
                dbc.CardBody([
                    html.H4("Current Risk"),
                    html.H2("85")
                ])
            ),
            width=3
        ),

        dbc.Col(
            dbc.Card(
                dbc.CardBody([
                    html.H4("Future Risk"),
                    html.H2("92")
                ])
            ),
            width=3
        ),

        dbc.Col(
            dbc.Card(
                dbc.CardBody([
                    html.H4("Alert"),
                    html.H2("CRITICAL")
                ])
            ),
            width=3
        ),

        dbc.Col(
            dbc.Card(
                dbc.CardBody([
                    html.H4("Root Cause"),
                    html.H2("Flow Rate")
                ])
            ),
            width=3
        )

    ]),

    html.Br(),

    dbc.Row([

        dbc.Col(
            dcc.Graph(
                figure=gauge
            ),
            width=12
        )

    ]),

    html.Br(),

    dbc.Row([

        dbc.Col(
            dcc.Graph(
                figure=importance_fig
            ),
            width=6
        ),

        dbc.Col(
            dcc.Graph(
                figure=timeline_fig
            ),
            width=6
        )

    ])

], fluid=True)

if __name__ == "__main__":
    app.run(debug=True)
