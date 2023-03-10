const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const { WebSocketServer, OPEN } = require("ws");
const http = require("http");
const musicals = require("./routes/musicals");
const reviews = require("./routes/reviews");
const venues = require("./routes/venues");
const Musical = require("./models/musical.js");
const reviewsBL = require("./BL/reviews");

const corsOptions = {
    origin: "http://localhost:3001",
    // origin: "*",
    debug: true,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
//
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
        if (client.readyState === OPEN) {
            client.send(
                JSON.stringify({
                    musicalReviews,
                    musicalRating,
                })
            );
        }
    });
};

// A new client connection request received
wsServer.on("connection", function (connection) {
    console.log(`Recieved a new connection.`);

    connection.on("message", (review) => broadcastReview(review.toString()));
});

app.use("/musicals", musicals);
app.use("/reviews", reviews);

app.listen(3000, () => {
    console.log("listening in port 3000");
});
