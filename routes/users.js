const express = require("express");
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const passport = require('passport');
const { isLoggedIn } = require("../middleware");
const cors = require('cors');
const Questiondb = require('../models/question');
// mongoose.connect('mongodb://localhost/qpaper-db', { useNewUrlParser: true, useUnifiedTopology: true });

router.post('/savequestion', cors(), (req, res) => {
    const customers = [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Brad', lastName: 'Traversy' },
        { id: 3, firstName: 'Mary', lastName: 'Swanson' },
    ];

    console.log(req.body);

        Questiondb.find({ paper_name: req.body.paper_name }, async function (err, docs) {
            console.log("debug1")
            if (err) {
                console.log(err);
                // console.log("debug2")
            }
            else {
                //  console.log(docs)
                if (docs.length === 0) {
                    // console.log(docs)
                    const newpaper = await new Questiondb({ paper_name: req.body.paper_name });
                    await newpaper.save();
                }
                let query;
                if (req.body.question.questiontype === 'Single-Correct') {
                    query = {$push: { SingleCorrect: req.body.question }};
                }
                if (req.body.question.questiontype === 'Multiple-Correct') {
                    query = {$push: { MultipleCorrect: req.body.question }};
                }
                if (req.body.question.questiontype === 'Numerical') {
                    query = {$push: { Numerical: req.body.question }};
                }

                let name = Questiondb.findOneAndUpdate(
                    { paper_name: req.body.paper_name },
                    query,
                    {
                        returnNewDocument: true
                    }, function (error, result) {
                        // console.log(error)
                        // console.log(result)
                    }
                )
                // console.log(name)
            }
        }
        );
    


    res.json(customers);
})

// app.use(cors());

router.post('/signup', cors(), async (req, res, next) => {
    console.log(req.body);
    const { username, password, role } = req.body;
    const user = new User({ username, role });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if (err) return next(err);
        console.log('before flash');
        // res.flash('success', 'Welcome to Yelp Camp!');
        console.log('after flash');
        // res.redirect('/');
        const customers = [
            { id: 1, firstName: 'John', lastName: 'Doe' },
            { id: 2, firstName: 'Brad', lastName: 'Traversy' },
            { id: 3, firstName: 'Mary', lastName: 'Swanson' },
        ];
        console.log(req.body);
        res.json(customers);
    })

})

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();

    // req.flash('success', "Goodbye!");
    // // res.send("LOGGED OUT");
    // res.redirect('/');
    const customers = [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Brad', lastName: 'Traversy' },
    ];
    console.log(req.body);
    res.json(customers);
})

// app.get('/login', function(req, res, next) {
//     passport.authenticate('local', function(err, user, info) {
//       if (err) { return next(err); }
//       if (!user) { return res.redirect('/login'); }
//       req.logIn(user, function(err) {
//         if (err) { return next(err); }
//         return res.redirect('/users/' + user.username);
//       });
//     })(req, res, next);
//   });

// passport.authenticate('local',{ failureFlash: true, failureRedirect: '/' }
router.post('/login', cors(), (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (!user) { res.json({ value: "0" }); }
        else {
            res.json({ value: "1" });
        }
    })(req, res, next);
    // req.flash('success', 'welcome back!');
    // const redirectUrl = req.session.returnTo || '/campgrounds';
    // delete req.session.returnTo;
    // res.redirect('/login');

})

router.post('/login/paper',function(req, res) {
    console.log(req.body)
    Questiondb.find({ paper_name: req.body.paper_name }, function (err, docs) {
        res.json(docs[0]);
        // console.log(docs)
    });
})

const clientID = '30a5e62205199f98fec1'
const clientSecret = '75682d11016eaa69d85720e369df0881ebdba12c'
// Declare the callback route
router.get('/login/github_callback', (req, res) => {

  // The req.query object has the query params that were sent to this route.
  const requestToken = req.query.code
    res.json({ ok: 1 })

    // res.redirect('/question');

  console.log("before axios")
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSON
    headers: {
         accept: 'application/json'
    }
  }).then((response) => {
    access_token = response.data.access_token
    console.log("github done")
    res.redirect('/');
    res.json({ ok: 1 })
  })
})


router.get('/github', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientID}`);
  });

module.exports = router

// 