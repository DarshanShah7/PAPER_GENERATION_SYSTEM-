const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
// const User = require('../models/user');
// const passport = require('passport');


router.post("/submit-question", function(req, res) {

    console.log(req.body);

})

module.exports = router;