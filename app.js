var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var mongoose = require("mongoose");


const path = require("path");

const port = 80;


app.use('/static', express.static('static')) // For serving static files
    // app.use('/jsfiles', express.static('jsfiles'))

app.use(express.urlencoded())

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})



//activating the port
app.listen(port, () => {

    console.log(`The application started successfully on port ${port}`);

})