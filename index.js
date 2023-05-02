const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// Endpoint for adding new users
app.post("/api/users", (req, res, next) => {
  console.log(req.body);
  // Add to Mongo
  
  res.json({ username: req.body.username, _id: "" });
  next();
});

//Endpoint for showing users
app.get("/api/users", (req, res, next) => {
  let allUsers = [{}];
  // Read from Mongo
  
  res.json(allUsers);
  next();
});

// Endpoint for adding new exercise
app.post("/api/users/:_id/exercises", (req, res, next) => {
  //Add to Mongo

  res.json({ _id: "", username: "", date: "", duration: "", description: "" });
});

// Endpoint for showing user's exercises
app.get("/api/users/:_id/logs", (req, res, next) => {
  //Read from Mongo

  res.json({ _id: "", username: "", count: "", log: [{ }] });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
