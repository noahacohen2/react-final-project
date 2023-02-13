const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const { WebSocketServer } = require("ws");
const http = require("http");
const musicals = require("./routes/musicals");
const reviews = require("./routes/reviews");
const venues = require("./routes/venues");
const Musical = require("./models/musical.js");
const reviewsBL = require("./BL/reviews");

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

// Spinning the http server and the WebSocket server.
const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;

server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

const broadcastReview = async (musicalId) => {
  const musicalReviews = await reviewsBL.getReviewsByMusical(musicalId);
  const musicalRating = await reviewsBL.getReviewRating(musicalId);
  wsServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN)
      client.send(
        JSON.stringify({
          musicalReviews,
          musicalRating,
        })
      );
  });
};

// I'm maintaining all active connections in this object

// A new client connection request received
wsServer.on("connection", function (connection) {
  // Generate a unique code for every user
  console.log(`Recieved a new connection.`);

  // Store the new connection and handle messages
  connection.on("message", (review) => broadcastReview(review.toString()));
});

app.use("/musicals", musicals);
app.use("/reviews", reviews);

app.listen(3000, () => {
  console.log("listening in port 3000");
});
