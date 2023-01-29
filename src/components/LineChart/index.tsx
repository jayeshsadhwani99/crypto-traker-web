import "./styles.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  BubbleDataPoint,
  Point,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Coin } from "../../models/coin";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
  },
  maintainAspectRatio: false,
};

function LineChart({ coin }: { coin: Coin | null }) {
  const [chartData, setChartData] = useState<
    ChartData<
      "line",
      (number | [number, number] | Point | BubbleDataPoint | null)[],
      unknown
    >
  >({
    labels: [],
    datasets: [
      {
        data: [],
        borderColor: "transparent",
        backgroundColor: "transparent",
      },
    ],
  });

  const dateList = (start: Date, end: Date): string[] => {
    const listDate = [];
    const startDate = start.toISOString().slice(0, 10);
    const endDate = end.toISOString().slice(0, 10);
    const dateMove = new Date(startDate);
    let strDate = startDate;

    while (strDate < endDate) {
      strDate = dateMove.toISOString().slice(0, 10);
      listDate.push(strDate);
      dateMove.setDate(dateMove.getDate() + 1);
    }

    return listDate;
  };

  const setData = (coin: Coin) => {
    const endDate: Date =
      new Date(coin.last_updated?.toString() ?? "") ?? new Date();
    const startDate: Date = new Date();
    startDate.setDate(
      startDate.getDate() - (coin.sparkline_in_7d?.price?.length ?? 0)
    );

    const labelList: string[] = dateList(startDate, endDate);
    const data: ChartData<
      "line",
      (number | [number, number] | Point | BubbleDataPoint | null)[],
      unknown
    > = {
      labels: labelList,
      datasets: [
        {
          data: coin.sparkline_in_7d?.price ?? [],
          borderColor:
            (coin.sparkline_in_7d?.price ?? [])[0] >
            (coin.sparkline_in_7d?.price ?? [])[
              (coin.sparkline_in_7d?.price ?? []).length - 1
            ]
              ? "red"
              : "green",
          backgroundColor:
            (coin.sparkline_in_7d?.price ?? [])[0] >
            (coin.sparkline_in_7d?.price ?? [])[
              (coin.sparkline_in_7d?.price ?? []).length - 1
            ]
              ? "red"
              : "green",
        },
      ],
    };

    setChartData(data);
  };

  useEffect(() => {
    if (coin) {
      setData(coin);
    }
  }, [coin]);

  if (chartData)
    return <Line options={options} data={chartData} className="chart" />;
  else return <></>;
}

export default LineChart;
