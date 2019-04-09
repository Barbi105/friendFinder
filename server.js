//dependencies
var express = require("express");
var path = require("path");

//creating an express server
var app = express();

//sets up initial port
var PORT = process.env.PORT || 8080;

//sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//router
require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);

//listener
app.listen(PORT, function(){
    console.log("app listening on PORT: " + PORT);
});