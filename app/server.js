const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const Bluebird = require('bluebird');

mongoose.Promise = Bluebird;

const config = require('./configs/server-config');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('web/out/'));

app.use(session({
   secret: 'fyrabuggochencocacolaspelardiscopahogmusik',
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


mongoose.Promise = global.Promise;

require('./passport')(passport);

app.post('/api/signout', function (req, res) {
   req.logout();
   res.send({ status: 'loggedout' });
});

app.post('/api/login', passport.authenticate('login'), (req, res) => {
   var user = { username: req.user.username, name: req.user.name };
   res.send({ status: 'loggedin', user });
});

app.get('/api/isAuthenticated', (req, res) => {
   var responseObject = {
      isAuthenticated: req.isAuthenticated()
   };
   if (req.user) {
      responseObject.user = { username: req.user.username, name: req.user.name };
   }
   res.send(responseObject);
});

app.use('/api/booking', require('./booking_router'));
app.use('/api/user', require('./user_router'));

app.listen(8099, () => {
   console.log('Listening on 8099');
   mongoose.connect(config.db_url, { useMongoClient: true }).then(() => {
      console.log('connected to database');
   }, (err) => {
      console.log("ERR", err);
   });
});

process.on('SIGINT', function () {
   mongoose.disconnect((err) => {
      process.exit(err ? 1 : 0);
   })
});