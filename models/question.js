const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const questionSchema = new mongoose.Schema({

});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);