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
};
