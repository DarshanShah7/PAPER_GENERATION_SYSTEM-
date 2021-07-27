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
    totalmarks:Number,    
    totalmarks_sc:Number,
    totalmarks_mc:Number,
    totalmarks_n:Number

});
const Marksdb = mongoose.model('mark', marksSchema);

const imageSchema = new mongoose.Schema({
    user: String,
    paper_id: String,
    img:
    {
        filename:String,
        contentType: String,
        flag:Boolean
    }
});
const Imagedb = mongoose.model('Image', imageSchema);

module.exports = {User, Questiondb, Marksdb, Imagedb}