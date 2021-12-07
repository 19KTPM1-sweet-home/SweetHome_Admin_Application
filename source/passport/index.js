const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const adminService = require('../services/adminService')

passport.use(new LocalStrategy(
  async function(username, password, done) {
    const admin = await adminService.findByUsername(username);
    if(!admin){
      return done(null,false,{message: 'Incorrect username.'})
    }
    const isValid = await adminService.validPassword(password,admin);
    if(!isValid){
      return done(null, false, { message: 'Incorrect password.' }); 
    }
    return done(null, admin);
    
  }
));
// Config for session management
// when login done, what we save to session => username
passport.serializeUser(function(admin, done) {
  done(null, admin.username);
});

// get username from session, how to deserializeUser
passport.deserializeUser(async function(username, done) {
    const admin = await adminService.findByUsername(username);
    done(null, admin);
});

module.exports = passport;