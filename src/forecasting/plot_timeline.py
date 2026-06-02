import plotly.express as px

class TimelinePlotter:

    def plot(self, timeline):

        timeline = timeline.copy()

        timeline["window"] = range(
            1,
            len(timeline) + 1
        )

        fig = px.line(
            timeline,
            x="window",
            y="risk",
            markers=True,
            title="TwinShield Risk Timeline"
        )

        fig.write_image(
            "risk_timeline.png"
        )

        print(
            "Saved risk_timeline.png"
        )
