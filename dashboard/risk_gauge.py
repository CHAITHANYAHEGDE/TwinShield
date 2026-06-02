import plotly.graph_objects as go

def build_gauge(score):

    fig = go.Figure(go.Indicator(
        mode="gauge+number",
        value=score,

        title={
            "text":"Predicted Threat Level"
        },

        gauge={
            "axis":{"range":[0,100]},

            "bar":{
                "color":"red"
            },

            "steps":[

                {
                    "range":[0,40],
                    "color":"green"
                },

                {
                    "range":[40,70],
                    "color":"orange"
                },

                {
                    "range":[70,100],
                    "color":"red"
                }
            ]
        }
    ))

    fig.update_layout(
        paper_bgcolor="#111111",
        font_color="white",
        height=350
    )

    return fig
