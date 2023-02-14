const axios = require("axios");
const Musical = require("./models/musical.js");
const Venue = require("./models/venue.js");
const Review = require("./models/review.js");

const { default: mongoose } = require("mongoose");

const api = axios.create({
    baseURL: "https://api-sandbox.londontheatredirect.com/rest/v2",
    withCredentials: true,
});


mongoose.connect(
    "mongodb+srv://final-react-project:Aa123456@cluster0.3fhpjno.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
).then(() => {
    console.log("mongo connection open");
}).catch((err) => {
    console.log("mongo connection error", err);
});


const ages = [5, 8, 16, 18];
const cities = ["London", "New York"]
const userId = ["EkqbDitXPEhaZ4b99Y0tLqC4mFk1", "4cKYccEoNtPr5HywI6l8gojEIXk1", "tjtyqZMoUSQe8sRszcc7Rm3YmZQ2", "9YVm13mXSXgyJyB30bxK77mhWj63", "tQSLnqoTjNaXLGpX6RIYHanJwXD2", "XwadqxDqA5aVtjjb8pz8zn3z3kA3"]
const seats = ["19", "18", "3", "1", "7", "65", "30", "14", "2", "55", "4", "13", "46", "38"];
const seatsLetter = ["A", "B", "C", "D", "E"];

const random = (arr) => {
    return Math.floor(Math.random() * arr.length);
}

const randomSeat = () => {
    return seats[random(seats)] + seatsLetter[random(seatsLetter)];
}

const initEvents = () => {
    api.get("/Events?type='1'",
        {
            headers: {
                'Api-Key': '1234'
            }
        }).then((data) => {
            let allEvents = data.data.Events;

            let dbEvents = allEvents.map((event) => {
                return {
                    EventId: event.EventId,
                    VenueId: event.VenueId,
                    Name: event.Name.split('-')[0],
                    RunningTime: event.RunningTime,
                    MinimumAge: ages[random(ages)],
                    MainImageUrl: event.MainImageUrl,
                    EventMinimumPrice: event.EventMinimumPrice,
                    TagLine: event.TagLine,
                    Description: event.Description,
                    City: cities[random(cities)]
                }
            });
            Musical.insertMany(dbEvents)
                .then(res => {
                    console.log(res)
                })
                .catch(e => {
                    console.log(e)
                })

            initReviews(dbEvents);
        }
        )
}

const initVenues = () => {
    api.get("/Venues",
        {
            headers: {
                'Api-Key': '1234'
            }
        }).then((data) => {
            let allVenues = data.data.Venues;

            let dbVenues = allVenues.map((venue) => {
                return {
                    "VenueId": venue.VenueId,
                    "Name": venue.Name,
                    "Info": venue.Info,
                    "Address": venue.Address
                }
            });
            Venue.insertMany(dbVenues)
                .then(res => {
                    console.log(res)
                })
                .catch(e => {
                    console.log(e)
                })
        }
        )
}

const initReview = (musicalId) => {
    api.get("/Events/" + musicalId + "/Reviews",
        {
            headers: {
                'Api-Key': '1234'
            }
        }).then((data) => {
            let allReviews = data.data.Reviews;

            let dbReviews = allReviews.map((review) => {
                return {
                    Stars: review.Stars,
                    Content: review.Content,
                    EventId: musicalId,
                    Seat: randomSeat(),
                    "User_id": userId[random(userId)]
                }
            });
            Review.insertMany(dbReviews)
                .then(res => {
                    console.log(res)
                })
                .catch(e => {
                    console.log(e)
                })
        }
        )
}

const initReviews = async (musicals) => {
    for (musical of musicals) {
        await initReview(musical.EventId)
    }
}


initEvents()
// initVenues();


