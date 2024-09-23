import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { fetchTemperatureData, TemperatureData } from "../apis/temperatureApi";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale
);

interface TemperatureGraphProps {
  onUpdateStats: (
    current: number,
    min: number,
    max: number,
    avg: number
  ) => void;
  darkMode: boolean;
}

const TemperatureGraph: React.FC<TemperatureGraphProps> = ({
  onUpdateStats,
  darkMode,
}) => {
  const [temperatureData, setTemperatureData] = useState<TemperatureData[]>([]);

  const getTemperatureData = async () => {
    try {
      const data = await fetchTemperatureData();
      setTemperatureData(data);

      if (data.length > 0) {
        const currentTemp = data[data.length - 1].value;
        const minTemp = Math.min(...data.map((d: TemperatureData) => d.value));
        const maxTemp = Math.max(...data.map((d: TemperatureData) => d.value));
        const avgTemp =
          data.reduce((sum: number, d: TemperatureData) => sum + d.value, 0) /
          data.length;

        onUpdateStats(currentTemp, minTemp, maxTemp, avgTemp);
      }
    } catch (error) {
      console.error("Error fetching temperature data:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(getTemperatureData, 2000);
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: temperatureData?.map((data) => new Date(data.timestamp)),
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatureData?.map((data) => data.value),
        fill: false,
        borderColor: darkMode
          ? "rgba(75, 192, 192, 1)"
          : "rgba(54, 162, 235, 1)",
        tension: 0,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit: "second" as const,
          tooltipFormat: "PPpp",
        },
        title: {
          display: true,
          text: "Time",
          color: darkMode ? "white" : "black",
        },
        ticks: {
          color: darkMode ? "white" : "black",
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperature (°C)",
          color: darkMode ? "white" : "black",
        },
        ticks: {
          color: darkMode ? "white" : "black",
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        suggestedMin: 25,
        suggestedMax: 40,
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: darkMode ? "white" : "black",
        },
      },
    },
    animation: {
      duration: 1000,
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-96">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TemperatureGraph;
