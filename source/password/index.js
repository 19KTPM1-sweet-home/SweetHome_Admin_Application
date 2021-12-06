const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const userService = require('../services/userService')

passport.use(new LocalStrategy(
  async function(email, password, done) {
    const user = await userService.findByEmail(email);
    if(!user){
      return done(null,false,{message: 'Incorrect username.'})
    }
    if(!userService.validPassword(password,user)){
      return done(null, false, { message: 'Incorrect password.' }); 
    }
    return done(null, user);
    
  }
));
// Config for session management
// when login done, what we save to session => username
passport.serializeUser(function(user, done) {
  done(null, user.email);
});

// get username from session, how to deserializeUser
passport.deserializeUser(function(username, done) {
  userService.findByUsername(username, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;