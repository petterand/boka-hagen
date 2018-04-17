const router = require('express').Router();
const User = require('./models/User');
const Roles = require('./configs/Roles');

const { isLoggedIn, isAdmin, getPasswordHash } = require('./AuthHelpers');


router.post('/', (req, res) => {
   let newUser = req.body;
   if (newUser) {
      if (newUser.password === newUser.confirm_password) {
         getPasswordHash(newUser.password).then((hash) => {
            const user = new User({
               name: newUser.name,
               username: newUser.username,
               password: hash,
               roles: [Roles.USER]
            });
            user.save(err => {
               if (err) { return res.status(500).send(err) }
               res.status(201).send({ name, username, roles } = user);
            });

         }, (err) => {
            res.status(500).send(err);
         })
      }
   }
});

router.delete('/:id', isAdmin, (req, res) => {

});

router.put('/:id', isAdmin, (req, res) => {

});

module.exports = router;