const express = require("express");
const port = 8000;
const app = express();
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const cookieParser = require('cookie-parser');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("./assets"));
app.use(expressLayouts);
// Extract styles & scripts from subpages
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);


app.use(express.static("./assets"));

// Setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(session({
  name : 'allsocial',
  secret : 'something',
  saveUninitialized : false,
  resave : false,
  cookie:{
    maxAge : (1000*60*1000)
  }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//Setting up router
app.use("/", require("./routes"));

// Creating Server
app.listen(port, (err) => {
  if (err) {
    console.log(`Error`);
  }
  console.log(`Server is running on port`, port);
});
