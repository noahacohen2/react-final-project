const express = require("express");
const router = express.Router();
const Review = require("../models/review.js");
<<<<<<< HEAD
const ObjectID = require("mongodb").ObjectId;
=======
const ObjectID = require('mongodb').ObjectId;
>>>>>>> delete review operation

router.get("/", (req, res) => {
  Review.aggregate([
    {
<<<<<<< HEAD
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
=======
      $lookup:
      {
        from: "musicals",
        localField: "EventId",
        foreignField: "EventId",
        as: "Musical"
      }
    },
    {
      $set: {
        Musical: { $arrayElemAt: ["$Musical.Name", 0] }
      }
    }
  ]).then((reviews) => {
    res.end(JSON.stringify(reviews));
  })
>>>>>>> delete review operation
    .catch((e) => {
      console.log(e);
      res.end();
    });
});

<<<<<<< HEAD
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

=======
>>>>>>> delete review operation
router.get("/:user", (req, res) => {
  let userId = req.params.user;
  Review.aggregate([
    {
<<<<<<< HEAD
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
=======
      $match: { User_id: userId }
    },
    {
      $lookup:
      {
        from: "musicals",
        localField: "EventId",
        foreignField: "EventId",
        as: "Musical"
      }
    },
    {
      $set: {
        Musical: { $arrayElemAt: ["$Musical.Name", 0] }
      }
    }
  ]).then((reviews) => {
    res.end(JSON.stringify(reviews));
  })
>>>>>>> delete review operation
    .catch((e) => {
      console.log(e);
      res.end();
    });
});

router.delete("/", (req, res) => {
  let review = req.body;

<<<<<<< HEAD
  Review.deleteOne({ _id: ObjectID(review._id) })
    .then(() => {
      res.end();
    })
    .catch((e) => {
      console.log(e);
      res.end();
    });
=======
  Review.deleteOne({ "_id": ObjectID(review._id) }).then(() => {
    res.end();
  }).catch(e => {
    console.log(e);
    res.end()
  });
>>>>>>> delete review operation
});

module.exports = router;
