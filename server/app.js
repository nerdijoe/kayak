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
const dbConfig = {
  development: 'mongodb://127.0.0.1/kayak',
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/auth', auth);
app.use('/authadmin', authAdmin);

app.use(passport.initialize());

passport.use('user', new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (username, password, done) => {
  console.log(`passport----> ${username}, ${password}`);

  db.User.findOne({
    where: {
      email: username,
    },
  }).then((user) => {
    if (!user) {
      done('User does not exist');
    } else if (passwordHash.verify(password, user.password)) {
      done(null, user);
    } else {
      done('Email and password do not match');
    }
  }).catch((err) => {
    console.log(err);
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
    if (!user) {
      done('User does not exist');
    } else if (passwordHash.verify(password, user.password)) {
      done(null, user);
    } else {
      done('Email and password do not match');
    }
  }).catch((err) => {
    console.log(err);
    done('Error');
  });
}));

const port = process.env.PORT || '3000';

app.listen(port, () => {
  console.log(`Kayak server is listening on port ${port}`);
});

module.exports = app;
