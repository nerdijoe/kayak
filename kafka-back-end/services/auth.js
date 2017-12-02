const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/mongoose_user');
const About = require('../models/mongoose_about');
const Interest = require('../models/mongoose_interest');
const db = require('../models');

module.exports = {
  signIn: (msg, cb) => {
    var res = {};
    console.log("In handle request, msg="+ JSON.stringify(msg));
    
    const username = msg.username;
    const password = msg.password;

    db.User.findOne({
      where: {
        email: username,
      },
    }).then((user) => {
  
      // User does not exist or password does not match
      //  will return HTTP Status Code 500
      if (!user) {
        // done('User does not exist');
        cb(null, false, { message: 'User does not exist' });
      } else if (passwordHash.verify(password, user.password)) {
        // will return HTTP Status Code 200
        cb(null, user);
      } else {
        // done('Email and password do not match');
        cb(null, false, {message: 'Email and password do not match!'})
        
      }
    }).catch((err) => {
      console.log(err);
      // this will return HTTP Status Code 400
      // done('Error');
      cb(null, false, {message: 'Error'});
      
    });
  },
  signInToken: (msg, cb) => {
    console.log('signInToken msg=', msg);
    const req = msg;

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

    cb(null, {
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
  },
  signUp: (msg, cb) => {
    console.log('signUp msg=', msg);
    const req = msg;
    const data = req.body;
  
    db.User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        // res.json({ message: 'Email is already taken.' });
        const errorMsg = {
          message: 'Email is already used. Please sign up using different email.',
        };
        // res.json(errorMsg);
        cb(false, errorMsg);

      } else {
        const newUser = req.body;
        newUser.password = passwordHash.generate(newUser.password);
  
        db.User.create(newUser)
          .then((user) => {
            console.log(`created a new user = ${user.email}`);
            // res.json(user);
            cb(false, user);
          }).catch((err) => {
            console.log(err);
            // res.json({ message: 'Error: cannot create user' });
            if (err) cb(false, err);
          });
      } // eof else
    });
  },
};
