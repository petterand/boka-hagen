const Roles = require('./configs/Roles');
const bcrypt = require('bcrypt');


function isLoggedIn(req, res, next) {
   if (req.isAuthenticated()) {
      return next();
   }
   res.status(401).send();
}

function isAdmin(req, res, next) {
   if (req.isAuthenticated() &&
      (req.user && req.user.roles && req.user.roles.includes(Roles.ADMIN))) {
      return next();
   }
   res.status(401).send();
}

function getPasswordHash(password) {
   return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
         if (err) { return reject(err) };
         resolve(hash);
      });
   })
}


module.exports = {
   isLoggedIn,
   isAdmin,
   getPasswordHash
};