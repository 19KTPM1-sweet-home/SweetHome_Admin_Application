const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const adminService = require('../services/adminService')

passport.use(new LocalStrategy({passReqToCallback: true},
  async function(req, username, password, done) {
    const admin = await adminService.findByUsername(username);
    if(!admin){
      return done(null,false,{messages: req.flash('errorMsg', 'Incorrect username')})
    }
    const isValid = await adminService.validPassword(password,admin);
    if(!isValid){
      return done(null, false, { messages: req.flash('errorMsg', 'Incorrect password') }); 
    }
    if(admin.lock == 'true')
      return done(null, false, { messages: req.flash('errorMsg', 'Your account was banned') }); 
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