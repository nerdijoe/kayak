const mongoose = require('mongoose');
const Car = require('../models/mongooseCar');
const CarDealer = require('../models/mongooseCarDealer');
const CarBilling = require('../models/mongooseCarBilling');

const logPage = require('../models/mongooseLogPage');
const logSearch = require('../models/mongooseLogSearch');

exports.createLogPage = (req, res) => {
  console.log('create logPage');
  const data = req.body;

  logPage.create({
    userId: data.userId,
    url: data.url,
  }, (err, newLog) => {
    if (err) res.json(err);
    res.json(newLog);
  });
};

exports.getAllLogPage = (req, res) => {
  logPage
    .find({})
    .exec((err, results) => {
      console.log('getAll results=', results);
      if (err) res.json(err);
      res.json(results);
    });
};



exports.getAllLogSearch = (req, res) => {
  logSearch
    .find({})
    .exec((err, results) => {
      console.log('getAllLogSearch results=', results);
      if (err) res.json(err);
      res.json(results);
    });
};




exports.aggregatePages = (req, res) => {
  const type = req.params.type;

  switch (type) {
    case 'count': {
      // count how many dealers
      logPage
        .aggregate([
          {
            $group: {
              _id: '$url',
              count: { $sum: 1 },
            },
          },
          {
            $sort: { count: -1 },
          },
        ], (err, result) => {
          if (err) res.json(err);
          res.json(result);
        });
      break;
    }
    case 'total': {
      // sum of total amount per dealer
      CarBilling
        .aggregate([
          {
            $group: {
              _id: '$dealer',
              total: { $sum: '$totalAmount' },
            },
          },
        ], (err, result) => {
          CarDealer.populate(result, { path: '_id' }, (err, populatedTransactions) => {
            // Your populated translactions are inside populatedTransactions
            if (err) res.json(err);
            res.json(populatedTransactions);
          });
        });
      break;
    }
    case 'userid': {
      // count how many hotels
      logPage
        .aggregate([
          {
            $group: {
              _id: '$userId',
              count: { $sum: 1 },
            },
          },
          {
            $sort: { count: -1 },
          },
        ], (err, result) => {
          if (err) res.json(err);
          res.json(result);
        });
      break;
    }

    default:
      res.json('invalid type');
  }
};


exports.aggregateSearches = (req, res) => {
  const type = req.params.type;

  switch (type) {

    case 'type': {
      // count how many hotels
      logSearch
        .aggregate([
          {
            $group: {
              _id: '$type',
              count: { $sum: 1 },
            },
          },
          {
            $sort: { count: -1 },
          },
        ], (err, result) => {
          if (err) res.json(err);
          res.json(result);
        });
      break;
    }

    case 'dealercity': {
      // count how many hotels
      logSearch
        .aggregate([
          { $match: { type: 'car' } },
          {
            $group: {
              _id: '$dealerCity',
              count: { $sum: 1 },
            },
          },
          {
            $sort: { count: -1 },
          },
        ], (err, result) => {
          if (err) res.json(err);
          res.json(result);
        });
      break;
    }

    case 'hotelcity': {
      // count how many hotels
      logSearch
        .aggregate([
          { $match: { type: 'hotel' } },
          {
            $group: {
              _id: '$hotelCity',
              count: { $sum: 1 },
              rooms: { $sum: '$rooms' },
              guests: { $sum: '$guests' },
            },
          },
          {
            $sort: { count: -1 },
          },
        ], (err, result) => {
          if (err) res.json(err);
          res.json(result);
        });
      break;
    }

    case 'airporta': {
      // count how many hotels
      logSearch
        .aggregate([
          { $match: { type: 'flight' } },
          {
            $group: {
              _id: '$airportA',
              count: { $sum: 1 },
              seats: { $sum: '$seats' },
            },
          },
          {
            $sort: { count: -1 },
          },
        ], (err, result) => {
          if (err) res.json(err);
          res.json(result);
        });
      break;
    }

    case 'airportb': {
      // count how many hotels
      logSearch
        .aggregate([
          { $match: { type: 'flight' } },
          {
            $group: {
              _id: '$airportB',
              count: { $sum: 1 },
              seats: { $sum: '$seats' },
            },
          },
          {
            $sort: { count: -1 },
          },
        ], (err, result) => {
          if (err) res.json(err);
          res.json(result);
        });
      break;
    }


    case 'seats': {
      // count how many hotels
      logSearch
        .aggregate([
          { $match: { type: 'flight' } },
          {
            $group: {
              _id: '$seats',
              count: { $sum: 1 },
            },
          },
          {
            $sort: { count: -1 },
          },
        ], (err, result) => {
          if (err) res.json(err);
          res.json(result);
        });
      break;
    }
    case 'classtype': {
      // count how many hotels
      logSearch
        .aggregate([
          { $match: { type: 'flight' } },
          {
            $group: {
              _id: '$classType',
              count: { $sum: 1 },
            },
          },
          {
            $sort: { count: -1 },
          },
        ], (err, result) => {
          if (err) res.json(err);
          res.json(result);
        });
      break;
    }
    case 'rooms': {
      // count how many hotels
      logSearch
        .aggregate([
          { $match: { type: 'hotel' } },
          {
            $group: {
              _id: '$rooms',
              count: { $sum: 1 },
            },
          },
          {
            $sort: { count: -1 },
          },
        ], (err, result) => {
          if (err) res.json(err);
          res.json(result);
        });
      break;
    }
    case 'guests': {
      // count how many hotels
      logSearch
        .aggregate([
          { $match: { type: 'hotel' } },
          {
            $group: {
              _id: '$guests',
              count: { $sum: 1 },
            },
          },
          {
            $sort: { count: -1 },
          },
        ], (err, result) => {
          if (err) res.json(err);
          res.json(result);
        });
      break;
    }



    default:
      res.json('invalid type');
  }

};
