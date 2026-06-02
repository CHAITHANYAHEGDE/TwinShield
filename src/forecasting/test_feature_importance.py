kkimport plotly.express as px

class ImportancePlotter:

    def plot(self, importance):

        fig = px.bar(
            importance,
            x="Importance",
            y="Feature",
            orientation="h",
            title="TwinShield Feature Importance",
            text="Importance"
        )

        fig.update_traces(
            texttemplate="%{text:.3f}"
        )

        fig.update_layout(
            yaxis=dict(
                autorange="reversed"
            )
        )

        fig.write_html(
            "feature_importance.html"
        )

        print(
            "Saved: feature_importance.html"
        )
fig.write_image(
    "feature_importance.png"
)
