const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const path = require('path');

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


const index = require('./routes/index');

const app = express();

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
