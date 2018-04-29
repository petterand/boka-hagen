const router = require('express').Router();
const User = require('./models/User');
const Roles = require('./configs/Roles');

const { isLoggedIn, isAdmin, getPasswordHash } = require('./AuthHelpers');

router.get('/', isAdmin, (req, res) => {
   User.find({}, (err, users) => {
      if (err) { return res.status(500).send(err) }
      res.status(200).send(users);
   });
})

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

router.delete('/:username', isAdmin, (req, res) => {
   const ueername = req.params.username;
   User.deleteOne({ username: username }, (err) => {
      if (err) { return res.status(500).send(err); }
      res.status(200).send({ "deleted": username });
   });
});

router.put('/:id', isAdmin, (req, res) => {

});

module.exports = router;