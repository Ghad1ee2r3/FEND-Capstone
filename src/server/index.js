const dotenv = require("dotenv");
dotenv.config();

var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("dist"));

console.log(__dirname);

// Three URL'S and there API keys
const geoNamesApiKey = `&username=${process.env.GEONAMES_API}`;
const geoNamesRoot = "http://api.geonames.org/searchJSON?q=";
const geoNamesParams = "&maxRows=1";

// url (e.g)http://api.geonames.org/searchJSON?q=saudi-arabia&maxRows=1&username=ghad
//result= {"totalResultsCount":25879,"geonames":[{"adminCode1":"00","lng":"45","geonameId":102358,"toponymName":"Kingdom of Saudi Arabia","countryId":"102358","fcl":"A","population":33699947,"countryCode":"SA","name":"Saudi Arabia","fclName":"country, state, region,...","countryName":"Saudi Arabia","fcodeName":"independent political entity","adminName1":"","lat":"25","fcode":"PCLI"}]}

const weatherBitApiKey = `&key=${process.env.WEATHERBIT_API_KEY}`;
const weatherBitRoot = "https://api.weatherbit.io/v2.0/forecast/daily?";
// const weatherBitParams = ;

const pixabayApiKey = `?key=${process.env.PIXABAY_API}`;
const pixabayRoot = "https://pixabay.com/api/";
const pixabayParams =
  "&image_type=photo&orientation=horizontal&safesearch=true&per_page=100";

//url (e.g) https://pixabay.com/api/?key=32332003-3c157&q=yellow+flowers&image_type=photo&pretty=true

// designates what port the app will listen to for incoming requests
app.listen(3001, function () {
  console.log("Example app listening on port 3001!");
});

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  // res.sendFile(path.resolve('src/client/views/index.html'))
});

// app.get("/", function (req, res) {
//   res.sendFile("dist/index.html");
// });

// app.get("/test", function (req, res) {
//   res.send(mockAPIResponse);
// });
// Empty array to store project data
let projectData = {};

// app.post("/api", function (req, res) {
//   console.log(`Url input: ${req.body.urlInput}`);
//   textapi.sentiment(
//     { url: req.body.urlInput },

//     (error, response) => {
//       if (error === null) {
//         // Valid Url Response

//         console.log("*** Valid Url ***");
//         res.send(response);
//       } else {
//         // Invalid Url Response

//         console.log("*** Invalid Url ***");
//         res.status(404).json({ validation: "Invalid url, please re-enter." });
//       }
//     }
//   );
// });

// Post route that collects user data and stores it in "projectData" object
app.post("/clientData", async (req, res) => {
  const data = req.body;
  projectData = data;
  console.log(projectData);

  const geonamesUrl = await fetch(
    `${geoNamesRoot}${data.city}${geoNamesApiKey}${geoNamesParams}`,
    {
      method: "POST",
    }
  );

  try {
    const geoData = await geonamesUrl.json();
    projectData["long"] = geoData.geonames[0].lng;
    projectData["lat"] = geoData.geonames[0].lat;
    projectData["name"] = geoData.geonames[0].name; //toponymName
    projectData["countryName"] = geoData.geonames[0].countryName;
    projectData["code"] = geoData.geonames[0].countryCode;
    console.log("apiData ++++>", projectData);
    res.send(projectData);
  } catch (err) {
    console.log("error", err);
  }
});

// Endpoint for the weatherBit API
app.get("/getWeatherbit", async (req, res) => {
  console.log(`Request latitude is ${projectData.lat}`);
  console.log(`Request longitude is ${projectData.long}`);
  const lat = projectData.lat;
  const long = projectData.long;
  const weatherbitURL = `${weatherBitRoot}lat=${lat}&lon=${long}${weatherBitApiKey}`;
  console.log(`Weatherbit URL is ${weatherbitURL}`);
  try {
    const response = await fetch(weatherbitURL);

    // Checks for failed data transfer from API, returns null
    if (!response.ok) {
      console.log(
        `Error connecting to Weatherbit API. Response status ${response.status}`
      );
      res.send(null);
    }
    const weatherbitData = await response.json();
    projectData["icon"] = weatherbitData.data[0].weather.icon;
    projectData["description"] = weatherbitData.data[0].weather.description;
    projectData["temp"] = weatherbitData.data[0].temp;
    res.send(weatherbitData);
    console.log(weatherbitData);
    // If failed connection to API, return null
  } catch (error) {
    console.log(`Error connecting to server: ${error}`);
    res.send(null);
  }
});

// Endpoint for the Pixabay API
app.get("/getPix", async (req, res) => {
  console.log(`Pixabay request city is ${projectData.name}`);
  const city = projectData.name;
  let pixabayURL = `${pixabayRoot}${pixabayApiKey}&q=${city}${pixabayParams}`;
  console.log(`Pixabay URL is ${pixabayURL}`);
  try {
    let response = await fetch(pixabayURL);
    // Checks for failed data transfer from API, returns null
    if (!response.ok) {
      console.log(
        `Error connecting to Pixabay API. Response status ${response.status}`
      );
      res.send(null);
    }
    let pixData = await response.json();
    projectData["image1"] = pixData.hits[0].webformatURL;
    projectData["image2"] = pixData.hits[1].webformatURL;
    projectData["image3"] = pixData.hits[2].webformatURL;
    res.send(pixData);
    console.log(image1, image2, image3);
    image1, image2, (image3 = projectData);

    // If no photo was returned for city, get one for the country instead
    if (responseJSON.total == 0) {
      const country = projectData.countryName;
      console.log(
        `No photo available for ${city}. Finding photo for ${country}.`
      );
      pixabayURL = `${pixabayRoot}${country}${pixabayApiKey}${pixabayParams}`;
      console.log(`Pixabay country search URL is ${pixabayURL}`);
      response = await fetch(pixabayURL);
      // Checks for failed data transfer from API, returns null
      if (!response.ok) {
        console.log(
          `Error connecting to Pixabay. Response status ${response.status}`
        );
        res.send(null);
      }
      responseJSON = await response.json();
    }

    res.send(responseJSON);
    // If failed connection to API, return null
  } catch (error) {
    console.log(`Error connecting to server: ${error}`);
    res.send(null);
  }
});

// endpoint for REST api
app.get("/getRest", async (req, res) => {
  console.log("Calling rest API");
  const country = projectData.countryName;
  const restUrl = `https://restcountries.eu/rest/v2/name/${country}`;
  console.log(`Rest API url is ${restUrl}`);
  try {
    const response = await fetch(restUrl);

    // Checks for failed data transfer from API, returns null
    if (!response.ok) {
      console.log(
        `Error connecting to Rest API. Response status ${response.status}`
      );
      res.send(null);
    }
    const restData = await response.json();
    projectData["countryCode"] = restData[0].alpha2Code;
    projectData["callingCode"] = restData[0].callingCodes;
    projectData["currency"] = restData[0].currencies[0].name;
    projectData["currencySym"] = restData[0].currencies[0].symbol;
    projectData["language"] = restData[0].languages[0].name;
    projectData["flag"] = restData[0].flag;
    res.send(restData);
    console.log(restData);
    // If failed connection to API, return null
  } catch (error) {
    console.log(`Error connecting to server: ${error}`);
    res.send(null);
  }
});

// GET endpoint gets the data for the UI
app.get("/getData", (req, res) => {
  console.log(projectData);
  res.send(projectData);
  res.json({ message: "Data recieved" });
});

// Endpoint for testing express server
app.get("/testEndpoint", async (req, res) => {
  res.json({ message: "The endpoint test passed!" });
});

module.exports = app;
