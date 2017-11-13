const db = require('../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = (req, res) => {
  db.User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.json({ message: 'Email is already taken.' });
    } else {
      const newUser = req.body;
      newUser.password = passwordHash.generate(newUser.password);

      db.User.create(newUser)
        .then((user) => {
          console.log(`created a new user = ${user.email}`);
          res.json(user);
        }).catch((err) => {
          console.log(err);
          res.json({ message: 'Error: cannot create user' });
        });
    } // eof else
  });
};
