import express from "express";
import axios from "axios";
import path from "path"; // To resolve paths properly
const app = express();
const port = 3000;

// Middleware
app.use(express.static("public")); // Serve static files (like CSS, images, etc.)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.set("view engine", "ejs"); // Set EJS as the templating engine
//app.set("views", path.join(__dirname, "views")); // Set the views directory

// GET route for the homepage
app.get("/", (req, res) => {
  res.render("index.ejs", { data: null, error: null }); // Render the homepage
});

// POST route for fetching weather
app.post("/", async (req, res) => {
  try {
    const city = req.body.City; // Get city name from the form
    console.log(city)
    const apiKey = "d0add2724519b7d064805b6e9c84d8f3"; // Your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const result = response.data;
    const iconUrl = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;

    // Render the result back to the EJS template
    res.render("index.ejs", { data: result, iconUrl });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.render("index.ejs", { data: null, error: "City not found. Please try again." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
