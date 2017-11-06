const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const path = require('path');

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
