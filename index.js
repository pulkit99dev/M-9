const express = require("express");
const port = 8000;
const app = express();
const path = require("path");
const expressLayouts = require('express-ejs-layouts');
const db = require('./model/mongoose');

app.use(express.static('./assets'))
app.use(expressLayouts);
// Extract styles & scripts from subpages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Setting up router
app.use('/', require('./routes/index'))
app.use(express.static('./assets'));


// Setting up view engine
app.set("view engine", "ejs");
app.set('views', './views');




// Creating Server
app.listen(port, (err) => {
  if (err) {
    console.log(`Error`);
  }
  console.log(`Server is running on port`, port);
});
