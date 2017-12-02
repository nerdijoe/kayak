const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passwordHash = require('password-hash');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const action = require('./helpers/actionConstants');

const db = require('./models');

const app = express();

// Sequelize setup ####
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, 'config', 'config.json'))[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: '127.0.0.1',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Sequelize MySQL Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
// sequelize setup end ####


// mongoose setup ####
// const dbConfig = {
//   development: 'mongodb://127.0.0.1/kayak',
//   test: 'mongodb://127.0.0.1/kayak_test',
// };

const username = process.env.MONGODB_ATLAS_USERNAME;
const password = process.env.MONGODB_ATLAS_PASSWORD;
const dbConfig = {
  production: `mongodb://${username}:${password}@cluster0-shard-00-00-i5u9w.mongodb.net:27017,cluster0-shard-00-01-i5u9w.mongodb.net:27017,cluster0-shard-00-02-i5u9w.mongodb.net:27017/kayak?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`,
  development: `mongodb://${username}:${password}@cluster0-shard-00-00-i5u9w.mongodb.net:27017,cluster0-shard-00-01-i5u9w.mongodb.net:27017,cluster0-shard-00-02-i5u9w.mongodb.net:27017/kayak_dev?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`,
  test: 'mongodb://127.0.0.1/kayak_test',
};

const appEnv = app.settings.env;
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig[appEnv], { useMongoClient: true }, (err, res) => {
  console.log(`Connected to DB: ${dbConfig[appEnv]}`);
});


// mongoose setup end ####


const index = require('./routes/index');
const auth = require('./routes/auth');
const authAdmin = require('./routes/authAdmin');
const users = require('./routes/users');
const admins = require('./routes/admins');

const cars = require('./routes/cars');
const carDealers = require('./routes/carDealers');
const carBillings = require('./routes/carBillings');

const log = require('./routes/logs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/auth', auth);
app.use('/authadmin', authAdmin);
app.use('/users', users);
app.use('/admins', admins);

app.use('/cars', cars);
app.use('/cardealers', carDealers);
app.use('/carbillings', carBillings);

app.use('/logs', log);

const hotels = require('./routes/hotels');
const hotelBillings = require('./routes/hotelBillings');
app.use('/hotels', hotels);
app.use('/hotelBillings', hotelBillings);

const flights = require('./routes/flights');
const flightBillings = require('./routes/flightBillings');
app.use('/flights', flights);
app.use('/flightbillings', flightBillings);

app.use(passport.initialize());

passport.use('user', new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (username, password, done) => {
  console.log(`passport----> ${username}, ${password}`);

  db.User.findOne({
    where: {
      email: username,
    },
  }).then((user) => {

    // User does not exist or password does not match
    //  will return HTTP Status Code 500
    if (!user) {
      done('User does not exist');
    } else if (passwordHash.verify(password, user.password)) {
      // will return HTTP Status Code 200
      done(null, user);
    } else {
      done('Email and password do not match');
    }
  }).catch((err) => {
    console.log(err);
    // this will return HTTP Status Code 400
    done('Error');
  });
}));

// for Admin
passport.use('admin', new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (username, password, done) => {
  console.log(`passport----> ${username}, ${password}`);

  db.Admin.findOne({
    where: {
      email: username,
    },
  }).then((user) => {
    // User does not exist or password does not match
    //  will return HTTP Status Code 500

    if (!user) {
      done('Admin does not exist');
    } else if (passwordHash.verify(password, user.password)) {
      // will return HTTP Status Code 200
      done(null, user);
    } else {
      done('Email and password do not match');
    }
  }).catch((err) => {
    console.log(err);
    // this will return HTTP Status Code 400

    done('Error');
  });
}));

// ------- Kafka -------
const kafka = require('./routes/kafka/client');

passport.use('kafka_user', new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (username, password, cb) => {
  console.log('In Passport, going to make kafka.make_request');

  kafka.make_request('request_topic', { action: action.USER_SIGN_IN, username: username, password: password }, (err, results) => {
    console.log('passport.use -> in result');
    console.log('   results=', results);
    if (err) {
      cb(err, {});
    } else {
      // if (results.code == 200) {
      //   console.log(' results.code == 200');
      //   cb(null,{ username, password });
      // } else {
      //   console.log(' else results.code');
      //   cb(null,false);
      // }

      if (results) {
        cb(null, results);
      } else {
        cb(null, false);
      }
    }
  });
}));


const port = process.env.PORT || '3010';

app.listen(port, () => {
  console.log(`Kayak server is listening on port ${port}`);
});

module.exports = app;
