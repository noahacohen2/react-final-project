const express = require("express");
const router = express.Router();
const Review = require("../models/review.js");
const ObjectID = require("mongodb").ObjectId;

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

router.get("/rating/", (req, res) => {
  Review.aggregate([
    {
      $match: { EventId: Number(req.query.musicalId) },
    },
    {
      $group: {
        _id: "$Stars",
        count: { $count: {} },
      },
    },
  ])
    .then((reviews) => {
      console.log(reviews);
      res.end(JSON.stringify(reviews));
    })
    .catch((e) => {
      console.log(e);
      res.end();
    });
});

router.get("/:user", (req, res) => {
  let userId = req.params.user;
  Review.aggregate([
    {
      $match: { User_id: userId },
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

router.delete("/", (req, res) => {
  let review = req.body;

  Review.deleteOne({ _id: ObjectID(review._id) })
    .then(() => {
      res.end();
    })
    .catch((e) => {
      console.log(e);
      res.end();
    });
});

module.exports = router;
