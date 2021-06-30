const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({
    username: String,
    role: String
});

userSchema.plugin(passportLocalMongoose);
mongoose.set('useCreateIndex', true);
const User = mongoose.model('User', userSchema);
const questionSchema = new mongoose.Schema({
    paper_name : String,
    author:String,
    paper_id: {type:String,unique:true},
    password:String,
    paper_details:[],
    randomization_details:[],
    SingleCorrect: [],
    MultipleCorrect: [],
    Numerical: []
});

// const conn = mongoose.createConnection('mongodb://localhost/qpaper-db', { useNewUrlParser: true, useUnifiedTopology: true });

// const Questiondb = conn.model('Question', questionSchema);
const Questiondb = mongoose.model('Question', questionSchema);


const marksSchema = new mongoose.Schema({
    username: String,
    paper_id: String,
    marks:Number
});
const Marksdb = mongoose.model('mark', marksSchema);
module.exports = {User, Questiondb, Marksdb}