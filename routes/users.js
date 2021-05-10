const express = require("express");
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const { isLoggedIn } = require("../middleware");
const cors = require('cors');

// app.use(cors());

router.post('/signup',cors(), async(req, res, next) => {
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
            {id: 1, firstName: 'John', lastName: 'Doe'},
            {id: 2, firstName: 'Brad', lastName: 'Traversy'},
            {id: 3, firstName: 'Mary', lastName: 'Swanson'},
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
        {id: 1, firstName: 'John', lastName: 'Doe'},
        {id: 2, firstName: 'Brad', lastName: 'Traversy'},
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
router.post('/login',cors(), (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (!user) {  res.json({value:"0"}); }
        else{
            res.json({value:"1"});
        }
    })(req, res, next);
    // req.flash('success', 'welcome back!');
    // const redirectUrl = req.session.returnTo || '/campgrounds';
    // delete req.session.returnTo;
    // res.redirect('/login');
    
})

router.post('/savequestion',cors(), (req, res) => {
        const customers = [
            {id: 1, firstName: 'John', lastName: 'Doe'},
            {id: 2, firstName: 'Brad', lastName: 'Traversy'},
            {id: 3, firstName: 'Mary', lastName: 'Swanson'},
          ];
          console.log(req.body);
          res.json(customers);
})



module.exports = router

// 