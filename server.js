const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const app = express();
const validateRegisterInput = require("./validation/register");
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
const uri = "mongodb://localhost:27017/BAKADB2";
// Connect to MongoDB
mongoose
  .connect(
    uri,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
mongoose.set('useFindAndModify', false);
// Passport middleware
app.use(passport.initialize());
// Passport config
console.log(validateRegisterInput);
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/posts", posts);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/test.html')
})

//for selecting infos
// var users = db.collection('users').find()


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));