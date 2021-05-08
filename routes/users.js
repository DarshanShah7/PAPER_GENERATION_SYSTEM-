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

    req.flash('success', "Goodbye!");
    // res.send("LOGGED OUT");
    res.redirect('/');
})


// passport.authenticate('local',{ failureFlash: true, failureRedirect: '/' }
router.post('/login',cors(),passport.authenticate('local',{ failureFlash: true, failureRedirect: '/' }), (req, res) => {
    // req.flash('success', 'welcome back!');
    // const redirectUrl = req.session.returnTo || '/campgrounds';
    // delete req.session.returnTo;
    // res.redirect('/login');
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