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
          }], (err, result) => {
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
    // case 'monthly': {
    //   const monthStartDate = moment('01/01/2017', 'MM/DD/YYYY'); //'2017-01-01';
      
    //   const monthEndDate = moment('12/31/2017', 'MM/DD/YYYY'); //'2017-12-30';

    //   console.log('monthStartDate = ', monthStartDate);
    //   console.log('monthEndDate = ', monthEndDate);
      
    //   CarBilling.aggregate()
    //     .project({
    //       'month': {
    //         '$cond': { if: {
    //           '$and': [
    //             { $gte: [ 'createdAt', monthStartDate ] },
    //             { $lte: [ 'createdAt', monthEndDate ] },
    //           ]}, then: 'totalAmount', else: 0
    //         } 
    //       },
    //     })
    //     // .group({
    //     //    _id: '_id',
    //     //    month: { $sum: '$month' },
    //     // })
    //     .exec(function(err, result) {
    //       if (err) res.json(err);
    //       res.json(result);
    //     })
    //   break;
    // }
    default:
      res.json('invalid type');
  }

  // sum of total amount per dealer
  // CarBilling
  //   .aggregate([
  //     {
  //       $group: {
  //         _id: '$dealer',
  //         total: { $sum: '$totalAmount' },
  //       },
  //     },
  //   ], (err, result) => {
  //     if (err) res.json(err);
  //     res.json(result);
  //   });

  // CarBilling
  //   .find({})
  //   .populate('car')
  //   .populate({
  //     path: 'dealer',
  //     match: { name: { $eq: 'Hertz' } },
  //   })
  //   .exec((err, result) => {
  //     console.log('getOne result=', result);
  //     if (err) res.json(err);
  //     res.json(result);
  //   });

  // CarBilling.lookup(
  //   {
  //     path: 'dealer',
  //     query: { 'dealer.name' : { $in: ['Hertz'] } },
  //   },
  //   (err, result) => {
  //     console.log('getOne result=', result);
  //     if (err) res.json(err);
  //     res.json(result);
  //   }
  // );



};


exports.aggregateSearches = (req, res) => {
  const type = req.params.type;

  switch (type) {
    case 'type': {
      // count how many dealers
      logSearch
        .aggregate([
          {
            $group: {
              _id: '$type',
              count: { $sum: 1 },
            },
          }], (err, result) => {
          if (err) res.json(err);
          res.json(result);
        });
      break;
    }
    case 'dealercity': {
      // count how many dealers
      logSearch
        .aggregate([
          {
            $group: {
              _id: '$dealerCity',
              count: { $sum: 1 },
            },
          }], (err, result) => {
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
    // case 'monthly': {
    //   const monthStartDate = moment('01/01/2017', 'MM/DD/YYYY'); //'2017-01-01';
      
    //   const monthEndDate = moment('12/31/2017', 'MM/DD/YYYY'); //'2017-12-30';

    //   console.log('monthStartDate = ', monthStartDate);
    //   console.log('monthEndDate = ', monthEndDate);
      
    //   CarBilling.aggregate()
    //     .project({
    //       'month': {
    //         '$cond': { if: {
    //           '$and': [
    //             { $gte: [ 'createdAt', monthStartDate ] },
    //             { $lte: [ 'createdAt', monthEndDate ] },
    //           ]}, then: 'totalAmount', else: 0
    //         } 
    //       },
    //     })
    //     // .group({
    //     //    _id: '_id',
    //     //    month: { $sum: '$month' },
    //     // })
    //     .exec(function(err, result) {
    //       if (err) res.json(err);
    //       res.json(result);
    //     })
    //   break;
    // }
    default:
      res.json('invalid type');
  }

  // sum of total amount per dealer
  // CarBilling
  //   .aggregate([
  //     {
  //       $group: {
  //         _id: '$dealer',
  //         total: { $sum: '$totalAmount' },
  //       },
  //     },
  //   ], (err, result) => {
  //     if (err) res.json(err);
  //     res.json(result);
  //   });

  // CarBilling
  //   .find({})
  //   .populate('car')
  //   .populate({
  //     path: 'dealer',
  //     match: { name: { $eq: 'Hertz' } },
  //   })
  //   .exec((err, result) => {
  //     console.log('getOne result=', result);
  //     if (err) res.json(err);
  //     res.json(result);
  //   });

  // CarBilling.lookup(
  //   {
  //     path: 'dealer',
  //     query: { 'dealer.name' : { $in: ['Hertz'] } },
  //   },
  //   (err, result) => {
  //     console.log('getOne result=', result);
  //     if (err) res.json(err);
  //     res.json(result);
  //   }
  // );



};
