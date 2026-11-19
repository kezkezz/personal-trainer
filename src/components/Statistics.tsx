import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { getTrainings } from "../api/trainingsapi";
import type { TrainingData } from "../types";
import groupBy from "lodash/groupBy";
import sumBy from "lodash/sumBy";

export default function Statistics() {

    const [trainings, setTrainings] = useState<TrainingData[]>([]);

    useEffect(() => {
        getTrainings()
            .then((data: TrainingData[]) => {
                setTrainings(data);
            })
            .catch(error => console.error(error));
    }, []);

    // Ryhmitellään aktiviteetin mukaan
    const groupedTrainings = groupBy(trainings, "activity");


    // Haetaan nimet, object.keys:llä, map käy kaikki läpi ja sumBy kaskee keston yhteen.
    const chartData = Object.keys(groupedTrainings).map(activity => ({
        activity: activity,
        minutes: sumBy(groupedTrainings[activity], "duration")
    }));

    return (
        <div>
            <BarChart
                xAxis={[{ scaleType: "band", data: chartData.map(item => item.activity) }]}
                series={[{ data: chartData.map(item => item.minutes), label: "Duration (min)" }]}
                height={500}
            />
        </div>
    );
}