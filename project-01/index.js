const express = require('express');
const app = express();

const userRouter = require('./routes/user');

const { connectMongoDB } = require('./connection');

const { logRequests } = require('./middleware');

const PORT = 8000;

connectMongoDB('mongodb://127.0.0.1:27017/youtube-app-1').then(() => console.log("MongoDB connected")).catch((err) => console.log("Error in connecting to MongoDB", err));

// this is the middleware
app.use(express.urlencoded({extended: false})); // to parse form data

app.use(logRequests("requests.log")); // for creating the logs of the requests


app.use("/api/users", userRouter);

app.listen(PORT, () => {console.log("App is running on port " + PORT)});
