const express = require("express");
const router = express.Router();
const { User, Questiondb } = require('../models/user');
const axios = require('axios')
const mongoose = require('mongoose');
const passport = require('passport');
const { isLoggedIn } = require("../middleware");
const cors = require('cors');
// const Questiondb = require('../models/question');
require('./github')
require('./google')
// mongoose.connect('mongodb://localhost/qpaper-db', { useNewUrlParser: true, useUnifiedTopology: true });
var ObjectId = require('mongodb').ObjectID;
const { readyException } = require("jquery");


router.post('/create_paper', cors(), async(req, res) => {

    console.log(req.body);
    try{
        const newpaper = await new Questiondb(req.body);
        await newpaper.save()
        res.send({success:true})
    }
    catch(err){
        res.send({success:false})
    }
    // .then(savedDoc => {
    // savedDoc === doc;
    // }); // true
        // Questiondb.find({ paper_name: req.body.paper_name }, async function (err, docs) {
        //     console.log("debug1")
        //     if (err) {
        //         console.log(err);
        //         // console.log("debug2")
        //     }
        //     else {
        //         //  console.log(docs)
        //         if (docs.length === 0) {
        //             // console.log(docs)
        //                     const newpaper = await new Questiondb({ paper_name: req.body.paper_name });
        //                     await newpaper.save().then(savedDoc => {
        //   savedDoc === doc; // true
            // });;
    //         }

    //     }
    // }
    // );

})


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
            req.body.question._id = ObjectId()
            if (req.body.question.questiontype === 'Single-Correct') {
                query = { $push: { SingleCorrect: req.body.question } };
            }
            if (req.body.question.questiontype === 'Multiple-Correct') {
                query = { $push: { MultipleCorrect: req.body.question } };
            }
            if (req.body.question.questiontype === 'Numerical') {
                query = { $push: { Numerical: req.body.question } };
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
            // console.log(user)
            res.json({ value: "1", userdata: user.username, role: user.role });
        }
    })(req, res, next);
    // req.flash('success', 'welcome back!');
    // const redirectUrl = req.session.returnTo || '/campgrounds';
    // delete req.session.returnTo;
    // res.redirect('/login');

})

router.post('/login/paper', function (req, res) {
    console.log(req.body)
    Questiondb.find({ paper_id: req.body.paper_id }, function (err, docs) {

        res.json(docs[0]);
        // console.log(docs)
    });
})

router.post('/login/teacher-paper', function (req, res) {
    console.log(req.body)
    Questiondb.find({ paper_name: req.body.paper_name }, function (err, docs) {

        res.json(docs[0]);
        // console.log(docs)
    });
})

// const clientID = '30a5e62205199f98fec1'
// const clientSecret = '75682d11016eaa69d85720e369df0881ebdba12c'
// router.get('/login/github_callback', (req, res) => {

//   const requestToken = req.query.code


//   console.log("before axios")
//   axios({
//     method: 'post',
//     url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
//     headers: {
//          accept: 'application/json'
//     }
//   }).then((response) => {
//     access_token = response.data.access_token
//     console.log("github done")
//     console.log(response)
//     res.redirect('/login');
//     res.json({ ok: 1 })
//   })
// })


// router.get('/github', (req, res) => {
//     res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientID}`);
//   });


router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/login/github_callback', passport.authenticate('github', { failureRedirect: '/github/error' }),
    function (req, res) {
        console.log(req.user.username)
        res.redirect('/logout');

    });

router.get('/github/error', (req, res) => res.send('Unknown Error'))

//authenticating with google
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile']
}));


//redirect url
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send(req.user);
    console.log("gggggggggggggggg")
    // res.redirect('/login');
});

module.exports = router

// 