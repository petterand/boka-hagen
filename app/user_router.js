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

router.put('/:username', isAdmin, (req, res) => {
   const username = req.params.username;
   if (req.body.password) {
      updatePassword(username, req.body).then(() => {
         res.status(200).send();
      }, (err) => {
         res.status(500).send(err);
      });
   } else {
      console.log('Updating user', username);
      updateUser(username, req.body).then(user => {
         console.log('Updated user', user);
         res.status(200).send(user);
      }, err => {
         console.log('failed to update user', username, err);
         res.status(500).send(err);
      })
   }
});

function updatePassword(username, body) {
   return new Promise((resolve, reject) => {
      if (body.password === body.confirm_password) {
         getPasswordHash(body.password).then(hash => {
            User.update({ username: username }, { $set: { password: hash } }, (err) => {
               if (err) { return reject(err) }
               resolve();
            });
         })
      } else {
         reject();
      }
   });
}

function updateUser(username, body) {
   return new Promise((resolve, reject) => {
      User.update({ username: username }, { $set: { name: body.name } }, (err, user) => {
         if (err) { return reject(err); }
         resolve({ name, username } = body);
      });
   });
}


module.exports = router;