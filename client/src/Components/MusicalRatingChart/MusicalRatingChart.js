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
import AppContext from "../../Context/Context";
import { Bar } from "react-chartjs-2";
import "./MusicalRatingChart.css";
import reviewsService from "../../Services/reviews";
import { useEffect, useState, useContext } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MusicalRatingChart = ({ musicalEventId }) => {
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
  const [getWebSocket] = useContext(AppContext).WebSocket;

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Musical Rating",
      },
    },
  };

  useEffect(() => {
    const getReviewsStars = () => {
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
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getWebSocket().onmessage = (reviews) => {
      getReviewsStars();
    };
    if (musicalEventId) getReviewsStars();
  }, [musicalEventId, getWebSocket]);

  return <Bar options={options} data={cahrtData} />;
};

export default MusicalRatingChart;
