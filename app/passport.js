const Strategy = require('passport-local').Strategy;
const User = require('./models/User');
const { isPasswordValid } = require('./AuthHelpers');

module.exports = (passport) => {

   passport.serializeUser((user, done) => {
      done(null, user.username);
   });

   passport.deserializeUser((username, done) => {
      User.findOne({ "username": username }, (err, user) => {
         done(err, user);
      });
   });


   passport.use('login', new Strategy({
      passReqToCallback: true
   },
      function (req, username, password, done) {


         User.findOne({ "username": username }, (err, user) => {
            if (err) { return done(err); }

            if (!user) {
               return done(null, false);
            }

            if (!user.isPasswordValid(password)) {
               return done(null, false);
            }

            return done(null, user);

         });

      }));

};