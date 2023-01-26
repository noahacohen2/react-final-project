const express = require("express");
const router = express.Router();
const Musical = require("../models/musical.js");

router.get("/", (req, res) => {
  Musical.find({})
    .then((musicals) => {
      return res.end(JSON.stringify(musicals));
    })
    .catch((e) => {
      console.log(e);
      res.end();
    });
});

module.exports = router;
