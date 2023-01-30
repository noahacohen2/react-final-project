import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./MusicalRatingChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Musical Rating",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "stars",
      data: labels.map((labl, i) => i * 10 + i),
      backgroundColor: "#F11551",
    },
  ],
};

const MusicalRatingChart = () => {
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default MusicalRatingChart;
