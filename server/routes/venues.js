const express = require("express");
const router = express.Router();
const Venue = require("../models/venue.js");

router.get("/", (req, res) => {
  Venue.find({})
    .then((venues) => {
      res.end(JSON.stringify(venues));
    })
    .catch((e) => {
      console.log(e);
      res.end();
    });
});

module.exports = router;
