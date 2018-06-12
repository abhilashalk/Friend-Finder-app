// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//creating an "express" server
var app = express();
//Sets intial port 
var PORT = process.env.PORT || 5000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.text());


// //Directing to route files in routing directory
require("./app/routing/apiRouts")(app);
require("./app/routing/htmlRoutes")(app);


// Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});