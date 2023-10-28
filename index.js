const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const binRoutes = require('./routes/bin');
const dataRoutes = require('./routes/bin-data');
require('dotenv').config();

const app = express()
const corsConfig = {
  credentials: true,
};
app.use(cors(corsConfig));

// app.use(cookieParser());
app.use(bodyParser.json())

// Route
app
  .use("/bin", binRoutes)
  // .use("/data", dataRoutes)
  // .use("/user", authRoutes)
  // .use("/activity", activityRoutes)
  .get("/", (req, res) => res.send("Welcome to the API!"))
  .all("*", (req, res) => res.send("You've tried reaching a route that doesn't exist."))

//dB
mongoose.connect(process.env.DBConnection)
  .then(console.log("Connected to database yuhuuuuu"))
  .catch((error) => console.error(error))

  // , "192.168.1.107" || 'localhost'

// Server / URL
app.listen(process.env.PORT, () =>
  console.log(`Server running on port: http://localhost:${process.env.PORT}`)
)
