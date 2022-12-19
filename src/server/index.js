const dotenv = require("dotenv");
dotenv.config();

var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const meaningcloud = require("https://api.meaningcloud.com/sentiment-2.1");
const mockAPIResponse = require("./mockAPI.js");

const app = express();
// You could call
// var application_key: process.env.API_KEY
var textapi =
  "https://api.meaningcloud.com/class-1.1?key=${process.env.API_KEY}";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  // res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// app.get("/test", function (req, res) {
//   res.send(mockAPIResponse);
// });

app.post("/api", function (req, res) {
  console.log(`Url input: ${req.body.urlInput}`);
  textapi.sentiment(
    { url: req.body.urlInput },

    (error, response) => {
      if (error === null) {
        // Valid Url Response

        console.log("*** Valid Url ***");
        res.send(response);
      } else {
        // Invalid Url Response

        console.log("*** Invalid Url ***");
        res.status(404).json({ validation: "Invalid url, please re-enter." });
      }
    }
  );
});
