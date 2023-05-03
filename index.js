const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");
let mongoose;
try {
  mongoose = require("mongoose");
} catch (e) {
  console.log(e);
}


app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// Endpoint for adding new users
const addNewUser = require("./app.js").addNewUser;
app.post("/api/users", (req, res, next) => {
  console.log(req.body);
  // Add to Mongo
  addNewUser(req.body.username, function(err, newUser) {
    if (err) return console.log(err);
    res.json({ username: newUser.username, _id: newUser._id });
    next();
  });
});

//Endpoint for showing users
const getAllUsers = require("./app.js").getAllUsers;
app.get("/api/users", (req, res, next) => {
  let allUsers = [{}];
  // Read from Mongo
  getAllUsers(function(err, allUsers) {
    if (err) return console.log(err);
    res.json(allUsers);
    next();
  });
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
