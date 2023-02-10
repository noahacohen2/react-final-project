import api from "../config/api";

export default {
  async getReviews(currentMusicalId) {
    return await api
      .get("/reviews", { params: { musicalId: currentMusicalId } })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async getMusicalReviewsRatingAmount(currentMusicalId) {
    return await api
      .get("/reviews/rating", { params: { musicalId: currentMusicalId } })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async getUserReviews(userID) {
    return await api
      .get("/reviews/" + userID, {})
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async deleteReview(review) {
    return await api
      .delete("/reviews", { data: review })
      .then((res) => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  },

  async upsertReview(
    reviewName,
    reviewSeat,
    reviewContent,
    reviewStars,
    reviewUser,
    musicalEventId
  ) {
    debugger;
    return await api
      .post("/reviews", {
        params: {
          reviewName,
          reviewSeat,
          reviewContent,
          reviewStars,
          reviewUser,
          musicalEventId,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
