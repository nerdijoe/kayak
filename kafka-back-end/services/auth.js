const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/mongoose_user');
const About = require('../models/mongoose_about');
const Interest = require('../models/mongoose_interest');

module.exports = {
  signIn: (msg, cb) => {
    var res = {};
    console.log("In handle request, msg="+ JSON.stringify(msg));
  
    // if (msg.username == "bhavan@b.com" && msg.password =="a") {
    //   console.log('*** handle_request user and pass correct');
    //   res.code = "200";
    //   res.value = "Success Login";
    // } else {
    //   console.log('*** handle_request failed login');
    //   res.code = "401";
    //   res.value = "Failed Login";
    // }
  
    const username = msg.username;
    const password = msg.password
  
    // User.findOne({
    //   email: username,
    // }, (err, user) => {
    //   console.log('******** user=', user);
    //   if (err) cb(err);
    //   if (!user) {
    //     cb(null, false, { message: 'User does not exist' });
    //     // cb.json({ message: 'User does not exist'})
    //   } else {
    //     if (passwordHash.verify(password, user.password)) {
    //       console.log('********* user password is verified, user=', user);
    //       cb(null, user);
    //     } else {
    //       cb(null, false, {message: 'Password is not correct !'})
    //       // cb(null, false);
    //     }
    //   }
    // });

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
    data.password = passwordHash.generate(req.body.password);
  
    User.findOne({ email: data.email }, (err, user) => {
      if (user) {
        const errorMsg = {
          message: 'Email is already used. Please sign up using different email.',
        };
        // res.json(errorMsg);
        cb(false, errorMsg);
      } else {
        User.create({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          password: data.password,
          // mysql_id: 0,
        }, (err2, newUser) => {
          if (err2) cb(false, err2); //res.json(err2);
  
          const newAbout = About({
            overview: '',
            work_edu: '',
            contact_info: '',
            life_events: '',
            user: newUser._id,
          });
  
          newAbout.save((err3, about) => {
            const newInterest = Interest({
              music: '',
              shows: '',
              sports: '',
              fav_teams: '',
              user: newUser._id,
            });
            newInterest.save((err4, interest) => {
              // res.json(newUser);
              cb(false, newUser);
            });
          }); // end of newAbout.save
        });
      } // end of else
    });

  },
};

// function handle_request(msg, cb) {
//   var res = {};
//   console.log("In handle request, msg="+ JSON.stringify(msg));

//   // if (msg.username == "bhavan@b.com" && msg.password =="a") {
//   //   console.log('*** handle_request user and pass correct');
//   //   res.code = "200";
//   //   res.value = "Success Login";
//   // } else {
//   //   console.log('*** handle_request failed login');
//   //   res.code = "401";
//   //   res.value = "Failed Login";
//   // }

//   const username = msg.username;
//   const password = msg.password

//   User.findOne({
//     email: username,
//   }, (err, user) => {
//     if (err) cb(err);
//     if (!user) {
//       cb(null, false, { message: 'User does not exist' });
//       // cb.json({ message: 'User does not exist'})
//     } else {
//       if (passwordHash.verify(password, user.password)) {
//         console.log('********* user password is verified, user=', user);
//         cb(null, user);
//       } else {
//         // cb(null, false, {message: 'Password is not correct !'})
//         cb(null, false);
//       }
//     }
//   });


//   // callback(null, res);
// }

// exports.handle_request = handle_request;
