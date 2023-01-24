const express = require("express");
const router = express.Router();
const Review = require("../models/review.js");

router.get("/", (req, res) => {
  Review.find({})
    .then((reviews) => {
      res.end(JSON.stringify(reviews));
    })
    .catch((e) => {
      console.log(e);
      res.end();
    });
});

module.exports = router;
