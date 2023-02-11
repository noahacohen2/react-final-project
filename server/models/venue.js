const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  VenueId: {
    type: Number,
    require: true,
  },
  Name: {
    type: String,
    require: true,
  },
  Address: {
    type: String,
    require: true,
  },
  Info: {
    type: String,
    require: true,
  },
});

const Venue = mongoose.model("venues", venueSchema);
module.exports = Venue;
