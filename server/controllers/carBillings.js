const mongoose = require('mongoose');
const moment = require('moment');

const Car = require('../models/mongooseCar');
const CarDealer = require('../models/mongooseCarDealer');
const CarBilling = require('../models/mongooseCarBilling');

exports.cancel = (req, res) => {
    const billingId = req.params.billingId;
    // const userId = req.decoded.id;

    CarBilling.findByIdAndUpdate(
        billingId,
        {
            $set: {
                isCanceled: true,
            },
        },
        (err, result) => {
        if (err) res.json(false);
    res.json(true);
}
);
};

exports.delete = (req, res) => {
    const billingId = req.params.billingId;
    // const userId = req.decoded.id;

    CarBilling.findByIdAndUpdate(
        billingId,
        {
            $set: {
                isDeleted: true,
            },
        },
        (err, result) => {
        if (err) res.json(false);
    res.json(true);
}
);
};

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
        car,
        dealer: car.dealer,
        dealerCity: car.dealer.city,
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

        // CarBilling
        //   .findById(booked._id)
        //   .populate('car')
        //   .populate('dealer')
        //   .exec((err, result) => {
        //     console.log('after booking populated result=', result);
        //     if (err) res.json(err);
        //     res.json(result);
        //   });
        
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
    case 'cumulative': {
      // count how many hotels
      CarBilling
        .aggregate([
          {
            $group: {
              _id: '',
              count: { $sum: 1 },
              total: { $sum: '$totalAmount' },
              days: { $sum: '$daysBooked' },
              prices: { $sum: '$priceBooked' },

            },
          }], (err, result) => {
          if (err) res.json(err);
          res.json(result[0]);
        });
      break;
    }
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
    case 'name': {
      // only return 2017 created bookings
      const startDate = new Date(2017, 1, 1);
      const endDate = new Date(2017, 12, 1);
      
      console.log('startDate = ', startDate);
      console.log('endDate=', endDate);
      CarBilling
        .aggregate(
          [
            { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
            {
              $group: {
                _id: '$dealer',
                count: { $sum: 1 },
                total: { $sum: '$totalAmount' },
                days: { $sum: '$daysBooked' },
                prices: { $sum: '$priceBooked' },
              },
            },
            {
              $sort: { total: -1 },
            },
          ],
          (err, result) => {

            CarDealer.populate(result, { path: '_id' }, (err, populatedTransactions) => {
              // Your populated translactions are inside populatedTransactions
              if (err) res.json(err);
              res.json(populatedTransactions);
            });
  
          }
        );
      break;
    }
    case 'city': {
      // count how many hotels

      // update dealerCity
      // CarBilling
      //   .find({})
      //   .populate('dealer')
      //   .exec((err, results) => {
          
      //     results.map( item => {
      //       console.log('item.name=', item.name);
      //       console.log('item.city=', item.city);

      //       CarBilling.findByIdAndUpdate(
      //         item._id,
      //         {
      //           $set: {
      //             dealerCity: item.dealer.city,
      //           },
      //         },
      //         (err, result) => {
      //           console.log('after edit car result=', result);
      //         }
      //       );
      //     })
      //   })

      CarBilling
        .aggregate([
          {
            $group: {
              _id: '$dealerCity',
              count: { $sum: 1 },
              total: { $sum: '$totalAmount' },
              days: { $sum: '$daysBooked' },
              prices: { $sum: '$priceBooked' },

            },
          },
          {
            $sort: { total: -1 },
          },
        ], (err, result) => {
          if (err) res.json(err);
          res.json(result);
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
