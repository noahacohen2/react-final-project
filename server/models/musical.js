const mongoose = require("mongoose");

const musicalSchema = new mongoose.Schema({
  EventId: {
    type: Number,
    require: true,
  },
  VenueId: {
    type: Number,
    require: true,
  },
  Name: {
    type: String,
    require: true,
  },
  RunningTime: {
    type: Number,
    require: true,
  },
  MinimumAge: {
    type: Number,
    require: true,
  },
  MainImageUrl: {
    type: String,
    require: true,
  },
  EventMinimumPrice: {
    type: Number,
    require: true,
  },
  TagLine: {
    type: String,
    require: true,
  },
  Description: {
    type: String,
    require: true,
  },
});

const Musical = mongoose.model("musicals", musicalSchema);
module.exports = Musical;
