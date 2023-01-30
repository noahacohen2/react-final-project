import api from "../Config/api.js";

export default {
    async getReviews() {
        return await api
            .get("/reviews", {})
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
                return false
            });
    }
};
