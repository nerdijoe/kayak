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





exports.getOne = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  Car
    .findById(id)
    .populate('dealer')
    .exec((err, result) => {
      console.log('getOne result=', result);
      if (err) res.json(err);
      res.json(result);
    });
};

exports.edit = (req, res) => {
  const id = req.params.id;

  // Car.findById(id)
  //   .exec((err, result) => {
  //     if (err) res.json(err);

  //     result.type = req.body.type;
  //     result.make = req.body.make;
  //     result.model = req.body.model;
  //     result.description = req.body.description;
  //     result.price = req.body.price
  //     result.
  //   });

  // skip updating dealer for now.
  Car.findByIdAndUpdate(
    id,
    {
      $set: {
        type: req.body.type,
        make: req.body.make,
        model: req.body.model,
        dealer: req.body.dealer,
        description: req.body.description,
        price: req.body.price,
        doorNumber: req.body.doorNumber,
        capacity: req.body.capacity,
      },
    },
    (err, result) => {
      console.log('after edit car result=', result);
      // if (result.nModified === 1) {
      //   console.log(`car id=[${id}] has been updated successfully`);
      //   res.json(true);
      // } else {
      //   res.json(false);
      // }
      // if (err) res.json(false);
      // res.json(true);

      Car
        .findById(result._id)
        .populate('dealer')
        .exec((err, populatedResult) => {
          console.log('populate result=', populatedResult);
          if (err) res.json(err);
          res.json(populatedResult);
        });
          // CarDealer.populate(result, { path: 'dealer' }, (err, populatedResult) => {
      //   // Your populated translactions are inside populatedTransactions
      //   if (err) res.json(err);
      //   res.json(populatedResult);
      // });
    }
  );
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Car.findByIdAndUpdate(
    id,
    {
      $set: {
        isDeleted: true,
      },
    },
    (err, result) => {
      console.log('after car delete result=', result);
      if (err) res.json(false);
      res.json(true);
    }
  );
};

exports.search = (req, res) => {
  console.log('car search');
  const searchString = req.body.searchString;
  console.log('    searchString=', searchString);

  CarDealer
    .find({ $text: { $search: searchString } })
    .exec((err, results) => {
      console.log('CarDealer.find results=', results);

      Car
        .find({ dealer: { $in: results } })
        .populate('dealer')
        .exec((err, cars) => {
          console.log('Car.find cars=', cars);
          if (err) res.json(err);
          res.json(cars);
        });
    });
};

exports.searchByQuery = (req, res) => {
  console.log('car search');
  const searchString = req.query;

  console.log('    searchString=', searchString);

  CarDealer
    .find({ $text: { $search: searchString.city } })
    .exec((err, results) => {
      console.log('CarDealer.find results=', results);

      Car
        .find({ dealer: { $in: results } })
        .populate('dealer')
        .exec((err, cars) => {
          console.log('Car.find cars=', cars);
          if (err) res.json(err);
          res.json(cars);
        });
    });
};


exports.aggregate = (req, res) => {
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
