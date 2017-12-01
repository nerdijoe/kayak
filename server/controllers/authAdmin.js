const db = require('../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = (req, res) => {
  db.Admin.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.json({ message: 'Email is already taken.' });
    } else {
      const newUser = req.body;
      newUser.password = passwordHash.generate(newUser.password);

      db.Admin.create(newUser)
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

exports.signin = (req, res, next) => {
  const user = req.user;
  // console.log('authAdmin signin', user);

  const email = user.email;

  // create jsonwebtoken
  const token = jwt.sign({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    address: user.address,
    city: user.city,
    state: user.state,
    zipcode: user.zipcode,
    phone: user.phone,
    profileImage: user.profileImage,
  }, process.env.JWT_KEY_ADMIN);

  res.send({
    token,
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    address: user.address,
    city: user.city,
    state: user.state,
    zipcode: user.zipcode,
    phone: user.phone,
    profileImage: user.profileImage,
  });
};
