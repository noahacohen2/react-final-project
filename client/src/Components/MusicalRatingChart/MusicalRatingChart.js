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

const MusicalRatingChart = ({ musicalEventId, ratingReviews }) => {
  const [cahrtData, setCahrtData] = useState({
    labels: [],
    datasets: [
      {
        label: "stars",
        data: [],
        backgroundColor: "#F11551",
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Musical Rating",
      },
    },
  };

  const setChartDataFromMessage = (stars) => {
    console.log("in setChartDataFromMessage, stars is", stars);
    let amountOfStars = stars;
    let tempLabels = [];
    let tempStars = [];
    amountOfStars.sort((a, b) => {
      return a._id - b._id;
    });

    amountOfStars.map((couple) => {
      tempLabels.push(couple.count);
      tempStars.push(couple._id);
    });

    setCahrtData({
      labels: tempStars,
      datasets: [
        {
          label: "stars",
          data: tempLabels,
          backgroundColor: "#F11551",
        },
      ],
    });
  };

  useEffect(() => {
    if (musicalEventId)
      reviewsService
        .getMusicalReviewsRatingAmount(musicalEventId)
        .then((res) => {
          setChartDataFromMessage(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [musicalEventId]);

  useEffect(() => {
    ratingReviews && setChartDataFromMessage(ratingReviews);
  }, [ratingReviews]);

  return <Bar options={options} data={cahrtData} />;
};

export default MusicalRatingChart;
