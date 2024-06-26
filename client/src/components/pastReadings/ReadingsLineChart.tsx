import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  TimeScale
} from "chart.js";
import LightBackground from "../LightBackground";
import 'chartjs-adapter-moment';
import { Line } from "react-chartjs-2";

interface Props {
  x: Date[];
  y: number[];
  title: string;
  xLabel: string;
  yLabel: string;
}

ChartJS.register(
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
);

export default function ReadingsLineChart({
  x,
  y,
  title,
  xLabel,
  yLabel,
}: Props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
        color: "#258239",
        font: {
          size: 20,
          weight: "bold" as const,
        },
      },
    },
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit: "hour" as const,
          displayFormats: {
            hour: "MMM D, hA",
          },
          tooltipFormat: "MMM D YYYY, h:mm:ss A",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12,
          color: "#258239",
        },
        title: {
          display: true,
          text: xLabel,
          color: "#258239",
          font: {
            size: 16,
            weight: "bold" as const,
          },
        },
      },
      y: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 6,
          color: "#258239",
        },
        title: {
          display: true,
          text: yLabel,
          color: "#258239",
          font: {
            size: 16,
            weight: "bold" as const,
          },
        },
      },
    },
  };

  const data = {
    labels: x,
    datasets: [
      {
        label: title,
        data: y,
        fill: false,
        backgroundColor: "#258239",
        borderColor: "#258239",
      },
    ],
  };

  

  return (
    <LightBackground>
      <Line data={data} options={options} />
    </LightBackground>
  );
}
