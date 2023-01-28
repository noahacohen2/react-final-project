import api from "../config/api.js";

export default {
  async getMusicals() {
    return await api
      .get("/musicals", {})
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
