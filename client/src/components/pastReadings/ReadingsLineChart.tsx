import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import LightBackground from "../LightBackground";

interface Props {
  x: Date[];
  y: number[];
  title: string;
  xLabel: string;
  yLabel: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
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
        ticks: {
          autoSkip: true,
          maxTicksLimit: 6,
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
      <Line data={data} options={options} />;
    </LightBackground>
  );
}
