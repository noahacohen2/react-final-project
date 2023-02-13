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
      },
    ]);
  },
  async getReviewRating(musicalId) {
    return await Review.aggregate([
      {
        $match: { EventId: Number(musicalId) },
      },
      {
        $group: {
          _id: "$Stars",
          count: { $count: {} },
        },
      },
    ]);
  },
};

module.exports = BL;
