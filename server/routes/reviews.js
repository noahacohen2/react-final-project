const express = require("express");
const router = express.Router();
const Review = require("../models/review.js");

router.get("/", (req, res) => {
  Review.aggregate([
    {
      $match: { EventId: Number(req.query.musicalId) },
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
  ])
    .then((reviews) => {
      res.end(JSON.stringify(reviews));
    })
    .catch((e) => {
      console.log(e);
      res.end();
    });
});

module.exports = router;
