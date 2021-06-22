const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({
    username: String,
    role: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);
const questionSchema = new mongoose.Schema({
    paper_name : String,
    SingleCorrect: [],
    MultipleCorrect: [],
    Numerical: []
});

// const conn = mongoose.createConnection('mongodb://localhost/qpaper-db', { useNewUrlParser: true, useUnifiedTopology: true });

// const Questiondb = conn.model('Question', questionSchema);
const Questiondb = mongoose.model('Question', questionSchema);
module.exports = {User, Questiondb}