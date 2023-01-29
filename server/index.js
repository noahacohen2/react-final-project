const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const musicals = require("./routes/musicals");
const reviews = require("./routes/reviews");
const venues = require("./routes/venues");
const Musical = require("./models/musical.js");

const corsOptions = {
  origin: "http://localhost:3001",
  // origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://final-react-project:Aa123456@cluster0.3fhpjno.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("mongo connection open");
  })
  .catch((err) => {
    console.log("mongo connection error", err);
  });

app.use("/musicals", musicals);
<<<<<<< HEAD
app.use("/reviews", reviews);
=======
app.use("/reviews", reviews)
>>>>>>> delete review operation

app.listen(3000, () => {
  console.log("listening in port 3000");
});
