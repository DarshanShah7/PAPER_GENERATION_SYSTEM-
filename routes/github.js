const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use(new GitHubStrategy({
  clientID: "30a5e62205199f98fec1",
  clientSecret: "75682d11016eaa69d85720e369df0881ebdba12c",
  callbackURL: "http://localhost:5000/login/github_callback"
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}
));