const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const binRoutes = require('./routes/bin');
const notificationRoutes = require('./routes/notification');

const app = express()
const corsConfig = {
  credentials: true,
};

app.use(cors(corsConfig));
app.use(bodyParser.json())

// Route
app
  .use("/bin", binRoutes)
  .use("/notification", notificationRoutes)
  .get("/", (req, res) => res.send("Welcome to the API!"))
  .all("*", (req, res) => res.send("You've tried reaching a route that doesn't exist."))

//dB
mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI)
  .then(console.log("Connected to Database"))
  .catch((error) => console.error(error))   

// Server / URL
app.listen(process.env.NEXT_PUBLIC_PORT, () =>
  console.log(`Server running on port: http://localhost:${process.env.NEXT_PUBLIC_PORT}`)
)
