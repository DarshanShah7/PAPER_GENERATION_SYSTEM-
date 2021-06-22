const express = require("express");
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const userRoutes = require('./routes/users'); //for router
const teacherRoutes = require('./routes/teacher');
const qpaperRoutes = require('./routes/qpaper');
const cors = require('cors');


const passportLocalMongoose = require('passport-local-mongoose');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const {User} = require('./models/user');


const path = require("path");
const { isLoggedIn } = require("./middleware");

const port = 5000;

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(cors());

const ejsMate = require('ejs-mate');

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'))

// getting-started.js
mongoose.connect('mongodb://localhost/login-db', { useNewUrlParser: true, useUnifiedTopology: true });


app.use('/static', express.static('static')) // For serving static files
    // app.use('/jsfiles', express.static('jsfiles'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// for authentication using passport 
app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
        // console.log(req.session)
        res.locals.currentUser = req.user;
        res.locals.success = req.flash('success');
        res.locals.error = req.flash('error');
        next();
    })
    // router 
app.use('/', userRoutes);
app.use('/', qpaperRoutes);
app.use('/question', teacherRoutes);
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})
app.get("/login", isLoggedIn, function(req, res) {
    // res.sendFile(path.join(__dirname + '/student-login.html'));

    res.render('teacher-login');
})




// app.post('/login', (req, res)=>{

//     console.log(`The application gave a post request`);
//     if(0 && docs[0].role === 'student')
//         res.sendFile(path.join(__dirname + '/student-login.html'));
//     else
//         res.sendFile(path.join(__dirname + '/teacher-login.html'));
//     // res.sendFile(path.join(__dirname + '/student-login.html'));
//     let query1 = User.find({username: req.body.username, password : req.body.password}, function (err, docs) {
//         if (err){
//             console.log(err);
//         }
//         else{
//             if(docs.length === 0){
//                 res.redirect('/');
//             }
//             // if(docs[0].role === 'student')
//             //     res.sendFile(path.join(__dirname + '/student-login.html'));
//             // else
//             //     res.sendFile(path.join(__dirname + '/teacher-login.html'));

//             console.log("First function call : ", docs[0]);
//         }
//     });

// });

// app.post('/signup', (req, res)=>{
//     let myData = new User(req.body);
//     console.log(req.body)
//     console.log(`The application gave a postsss request`);

//     User.find({username: req.body.username}, function (err, docs) {
//         if (err){
//             console.log(err);
//         }
//         else{
//             // check if username exists in database
//             if(docs.length===0){
//                 myData.save().then(()=>{
//                     res.send("This item has been saved to the database")
//                     }).catch(()=>{
//                     res.status(400).send("item was not saved to the databse")
//                     })
//             }
//             else{

//                 res.redirect('/');
//                 // res.send('<script>alert("your alert message");  </script>');
//             }
//         }
//     });


// });

//activating the port
app.listen(port, () => {

    console.log(`The application started successfully on port ${port}`);

});