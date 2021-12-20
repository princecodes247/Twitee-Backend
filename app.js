const mongoose = require("mongoose");
const express = require("express");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const {v4: uuidv4} = require('uuid');
const cron = require("node-cron");
const parser = require("cron-parser");

const dotenv = require('dotenv');
dotenv.config();

const db = require("./models");

const userRoute = require("./routes/user.routes");
const authRoute = require("./routes/auth.routes");
const port = process.env.PORT || 3002;
const dbURI = process.env.MONGODB_URI || "mongodb://127.0.0.1/twitee"

// "mongodb+srv://Oracle247:oracle247@cluster0.qvwi6.mongodb.net/jcrypto?retryWrites=true&w=majority";

db.mongoose
.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {
  app.listen(port, () =>
    console.log(`Server Running at ${port}`)
  );
  console.log("connected to db")
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.json({
    message: "Twitee server in working"
  })
})
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute)
