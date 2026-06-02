import plotly.express as px

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

        fig.write_html(
            "feature_importance.html"
        )

        fig.write_image(
            "feature_importance.png"
        )

        print("Saved successfully")
