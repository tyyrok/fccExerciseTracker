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
const addNewExercise = require("./app.js").addNewExercise;
app.post("/api/users/:_id/exercises", (req, res, next) => {
  //Add to Mongo
  let dateExercise;
  
  if (req.body.date) {
    dateExercise = new Date(req.body.date);
  } else dateExercise = Date();
  
  addNewExercise(req.params._id, req.body.description, req.body.duration, dateExercise, function(err, newExercise, username) {
    if (err) return console.log(err);
    res.json({ _id: newExercise.user_id, 
               username: username,
               date: newExercise.date.toDateString(),
               duration: newExercise.duration,
               description: newExercise.description, })
    next();
  });
});

// Endpoint for showing user's exercises
const showUserExercises = require("./app.js").showUserExercises;
app.get("/api/users/:_id/logs", (req, res, next) => {
  //Read from Mongo
  let from = req.query.from ?? new Date("1990-01-01");
  let to = req.query.to ?? new Date("2023-06-01");
  let limit = req.query.limit ?? null;

  console.log("Limit - " + limit);
  
  showUserExercises(req.params._id, from, to, limit, function (err, resultQuery, username){
    if (err) return console.log(err);
    res.json({ _id: req.params._id,
               username: username,
               count: resultQuery.length,
               log: resultQuery, });
    next();
    
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

