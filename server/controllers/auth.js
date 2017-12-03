const db = require('../models');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const kafka = require('../routes/kafka/client');
const action = require('../helpers/actionConstants');

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

exports.signin = (req, res, next) => {
  const user = req.user;
  // console.log('auth_sequelize signin', user);

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
    creditCardNum: user.creditCardNum,
    creditCardFullName: user.creditCardFullName,
  }, process.env.JWT_KEY);

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
    creditCardNum: user.creditCardNum,
    creditCardFullName: user.creditCardFullName,
  });
};


exports.signinKafka = (req, res) => {
  // req.user is passed from passport
  kafka.make_request('request_topic', { action: action.USER_SIGN_IN_TOKEN, user: req.user }, (err, results) => {
    console.log('signinKafka');
    // console.log('   results=', results);
    if (err) {
      console.log('  ----> signinKafka Error');
      res.json(err);
    } else {
      res.json(results);
    }
  });
};

exports.signupKafka = (req, res) => {

  kafka.make_request('request_topic', { action: action.USER_SIGN_UP, body: req.body }, (err, results) => {
    console.log('signupKafka');
    // console.log('   results=', results);
    if (err) {
      console.log('  ----> signupKafka Error');
      res.json(err);
    } else {
      res.json(results);
    }
  });
};
