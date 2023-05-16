require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

let userSchema = new mongoose.Schema({
  username: String,
});
let User = mongoose.model("User", userSchema);

let exerciseSchema = new mongoose.Schema({
  user_id: String,
  description: String,
  duration: Number,
  date: Date,
});
let Exercise = mongoose.model("Exercise", exerciseSchema);

function addNewUser(name, done){
  let newUser = new User({ username: name });
  newUser.save()
         .then( (addedUser) => {
           console.log(addedUser);
           done(null, addedUser);
         })
         .catch( (err) => { 
           console.log(err); 
         });
}

function getAllUsers(done){
  User.find({})
          .then( (all) => {
            console.log(all);
            done(null, all);
          })
          .catch( (err) => console.log(err));
}

function addNewExercise(userId, desc, duration, date, done){
   User.findById({ _id: userId })
       .then( (user) => {
         let newExercise = new Exercise ({ user_id: userId, 
                                    description: desc,
                                    duration: duration,
                                    date: date, });
         newExercise.save()
             .then( (addedExercise) => {
               console.log(addedExercise);
               console.log(user);
               done(null, addedExercise, user.username);
             })
             .catch((err) => {
               console.log(err);
             });
       })
       .catch( (err) => console.log(err));
}

exports.addNewUser = addNewUser;
exports.getAllUsers = getAllUsers;
exports.addNewExercise = addNewExercise;