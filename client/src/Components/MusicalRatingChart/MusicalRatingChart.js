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
import reviewsService from "../../Services/reviews";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MusicalRatingChart = ({ musicalEventId }) => {
  const [labels, setLabels] = useState([]);
  const [stars, setStars] = useState([]);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Musical Rating",
      },
    },
  };

  const data = {
    labels: stars,
    datasets: [
      {
        label: "stars",
        data: labels,
        backgroundColor: "#F11551",
      },
    ],
  };

  useEffect(() => {
    reviewsService
      .getMusicalReviewsRatingAmount(musicalEventId)
      .then((res) => {
        let amountOfStars = res.data;
        let tempLabels = [];
        let tempStars = [];
        amountOfStars.sort((a, b) => {
          return a._id - b._id;
        });

        amountOfStars.map((couple) => {
          tempLabels.push(couple.count);
          tempStars.push(couple._id);
        });

        setLabels(tempLabels);
        setStars(tempStars);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // labels

  return <Bar options={options} data={data} />;
};

export default MusicalRatingChart;
