require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

let userSchema = new mongoose.Schema({
  username: String,
});
let User = mongoose.model("User", userSchema);

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

exports.addNewUser = addNewUser;
exports.getAllUsers = getAllUsers;