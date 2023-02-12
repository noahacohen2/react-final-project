const Review = require("../models/review.js");
const ObjectID = require("mongodb").ObjectId;

const BL = {
    async getReviewsByMusical(musicalId) {
        return await Review.aggregate([
            {
                $match: { EventId: Number(musicalId) },
            },
            {
                $lookup: {
                    from: "musicals",
                    localField: "EventId",
                    foreignField: "EventId",
                    as: "Musical",
                },
            },
            {
                $set: {
                    Musical: { $arrayElemAt: ["$Musical.Name", 0] },
                },
            }]);
    }
}

module.exports = BL;

