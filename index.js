const express = require("express");
const port = 8000;
const app = express();
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");

//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo")(session);

const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const custoMware = require('./config/middleware-flash');

app.use(sassMiddleware({
  src: './assets/scss',
  dest: './assets/css',
  debug: true,
  outputStyle: 'extended',
  prefix:'/css'
}))

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("./assets"));
app.use(expressLayouts);

//make the upload path available to the browser or template engines
app.use('/uploads', express.static(__dirname + '/uploads'))

// Extract styles & scripts from subpages
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(express.static("./assets"));

// Setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "allsocial",
    secret: "something",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 1000,
    },
    store: new MongoStore(
      {
        mongooseConnection : db,
        autoRemove: 'disabled'
      }
    )
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(custoMware.setFlash);


//Setting up router
app.use("/", require("./routes"));

// Creating Server
app.listen(port, (err) => {
  if (err) {
    console.log(`Error`);
  }
  console.log(`Server is running on port`, port);
});
