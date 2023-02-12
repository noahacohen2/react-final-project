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
      res.status(200);
      res.end(JSON.stringify(reviews));
    })
    .catch((e) => {
      console.log("e", e);
      res.status(500);
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

router.post("/", (req, res) => {
  const review = req.body.params;

  Review.create([
    {
      Stars: review.reviewStars,
      Content: review.reviewContent,
      EventId: review.musicalEventId,
      Seat: review.reviewSeat,
      User_id: review.reviewUser,
    },
  ])
    .then(() => {
      res.end();
    })
    .catch((e) => {
      console.log(e);
      res.end();
    });
});

router.put("/", (req, res) => {
  let review = req.body;

  Review.updateOne({ _id: ObjectID(review._id) }, { $set: review })
    .then(() => {
      res.end();
    })
    .catch((e) => {
      console.log(e);
      res.end();
    });
});
module.exports = router;
