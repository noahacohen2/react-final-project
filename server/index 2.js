const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const { WebSocketServer } = require('ws');
const http = require('http');
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
    // const data = JSON.stringify(review);
    let musicalReviews = await reviewsBL.getReviewsByMusical(musicalId)
    console.log(musicalReviews)
    for (let userId in clients) {
        let client = clients[userId];
        client.send(JSON.stringify(musicalReviews));
    }
    console.log("broadcastReview")
}

const handleReview = (musicalId) => {
    console.log("handleReview", musicalId.toString())
    broadcastReview(musicalId.toString())
}

// I'm maintaining all active connections in this object
const clients = {};

// A new client connection request received
wsServer.on('connection', function (connection) {
    // Generate a unique code for every user
    const userId = 1234;
    console.log(`Recieved a new connection.`);

    // Store the new connection and handle messages
    clients[userId] = connection;
    connection.on('message', (review) => handleReview(review, userId));
    console.log(`${userId} connected.`);
});


app.use("/musicals", musicals);
app.use("/reviews", reviews);

app.listen(3000, () => {
    console.log("listening in port 3000");
});
