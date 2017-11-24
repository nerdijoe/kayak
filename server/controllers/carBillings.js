const mongoose = require('mongoose');
const moment = require('moment');

const Car = require('../models/mongooseCar');
const CarDealer = require('../models/mongooseCarDealer');
const CarBilling = require('../models/mongooseCarBilling');


exports.book = (req, res) => {
  console.log('carBillings book req.decoded.id=', req.decoded.id);
  console.log('    req.body', req.body);
  const id = mongoose.Types.ObjectId(req.body.carId);
  
  const data = req.body;

  Car
    .findById(id)
    .populate('dealer')
    .exec((err, car) => {
      console.log(car);
      if (err) res.json(err);


      const startDate = moment(data.startDate, 'MM/DD/YYYY');
      const endDate = moment(data.endDate, 'MM/DD/YYYY');
      const daysBooked = endDate.diff(startDate, 'days');
      
      console.log(`data.startDate = [${data.startDate}], data.endDate=[${data.endDate}]`);
      console.log(`startDate = [${startDate}], endDate=[${endDate}]`);
      console.log('    daysBooked = ', daysBooked);


      const booking = CarBilling({
        userId: req.decoded.id,
        car: car._id,
        dealer: car.dealer,
        daysBooked,
        priceBooked: car.price,
        totalAmount: (car.price * daysBooked),
        startDate: data.startDate,
        endDate: data.endDate,
      });

      booking.save((err, booked) => {
        if (err) res.json(err);
        console.log('After booking, booked=', booked);
        res.json(booked);
      });
    }); // eof Car.findById
};

exports.getUserBillings = (req, res) => {
  console.log('getUserBillings req.decoded.id=', req.decoded.id);
  const userId = req.decoded.id;

  CarBilling
    .find({ userId })
    .populate('car')
    .populate('dealer')
    .exec((err, results) => {
      console.log('getAll results=', results);
      if (err) res.json(err);
      res.json(results);
    });
};


exports.getAll = (req, res) => {
  console.log('getAll');
  
  CarBilling
    .find({})
    // .where('dealer').equals(mongoose.Types.ObjectId('5a0ea59c0837c46a7e3f11f5'))
    .populate('car')
    .populate('dealer')
    .exec((err, results) => {
      console.log('getAll results=', results);
      if (err) res.json(err);
      res.json(results);
    });
};

exports.getOne = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.billingId);

  CarBilling
    .findById(id)
    .populate('car')
    .populate('dealer')
    .exec((err, result) => {
      console.log('getOne result=', result);
      if (err) res.json(err);
      res.json(result);
    });
};

exports.aggregate = (req, res) => {
  const type = req.params.type;

  switch (type) {
    case 'count': {
      // count how many dealers
      CarBilling
        .aggregate([
          {
            $group: {
              _id: '$dealer',
              count: { $sum: 1 },
            },
          }], (err, result) => {
          CarDealer.populate(result, { path: '_id' }, (err, populatedTransactions) => {
            // Your populated translactions are inside populatedTransactions
            if (err) res.json(err);
            res.json(populatedTransactions);
          });

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
