const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passwordHash = require('password-hash');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();


// Sequelize setup ####
const Sequelize = require('sequelize');
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
  .catch(err => {
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


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

const port = process.env.PORT || '3000';

app.listen(port, () => {
  console.log(`Kayak server is listening on port ${port}`);
});

module.exports = app;
