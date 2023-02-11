const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  User_id: {
    type: String,
    require: true,
  },
  Stars: {
    type: Number,
    require: true,
  },
  Content: {
    type: String,
    require: true,
  },
  EventId: {
    type: Number,
    require: true,
  },
  Seat: {
    type: String,
    require: true,
  },
});

const Review = mongoose.model("reviews", reviewSchema);
module.exports = Review;
