const mongoose = require('mongoose');
const moment = require('moment');

const Flight = require('../models/mongooseFlight');
const FlightBilling = require('../models/mongooseFlightBilling');

// User
// router.get('/user', helper.auth, hotelBillingController.getUserBillings);
exports.getUserBillings = (req, res) => {
  console.log('getUserBillings req.decoded.id=', req.decoded.id);
  const userId = req.decoded.id;

  FlightBilling
    .find({ userId })
    .populate('flight')
    .exec((err, results) => {
    console.log('getAll results=', results);
  if (err) res.json(err);
  res.json(results);
});
};

// router.post('/book', helper.auth, hotelBillingController.book);
exports.book = (req, res) => {
  console.log('hotelBillings book req.decoded.id=', req.decoded.id);
  console.log('req.body', req.body);
  const id = mongoose.Types.ObjectId(req.body.flightId);

  const data = req.body;

  Flight
    .findById(id)
    .populate('departureAirport')
    .populate('arrivalAirport')
    .populate('airline')
    .exec((err, flight) => {
      console.log(flight);
      if (err) res.json(err);

      var price = flight.prices[DBTool.priceMap.get(data.flightClass)].price;

      const booking = FlightBilling({
        userId: req.decoded.id,
        flight,
        priceBooked: price,
        qtyBooked: data.qtyBooked,
        totalAmount: (price * data.qtyBooked),
      });

      booking.save((err, booked) => {
        if (err) res.json(err);
      console.log('After booking, booked=', booked);
      res.json(booked);
    });
});
};



// // Admin
// router.get('/', helper.authAdmin, hotelBillingController.getAll);
exports.getAll = (req, res) => {
  console.log('getAll');

  FlightBilling
    .find({})
    // .where('dealer').equals(mongoose.Types.ObjectId('5a0ea59c0837c46a7e3f11f5'))
    .populate('flight')
    .exec((err, results) => {
    console.log('getAll results=', results);
  if (err) res.json(err);
  res.json(results);
});
};

// router.get('/:billingId', helper.authAdmin, hotelBillingController.getOne);
exports.getOne = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.billingId);

  FlightBilling
    .findById(id)
    .populate('flight')
    .exec((err, result) => {
      console.log('getOne result=', result);
      if (err) res.json(err);
      res.json(result);
    });
};


// router.get('/aggregate/:type', helper.authAdmin, hotelBillingController.aggregate);
// exports.aggregate = (req, res) => {
//   const type = req.params.type;
//
//   switch (type) {
//     case 'count': {
//       // count how many dealers
//       CarBilling
//         .aggregate([
//           {
//             $group: {
//               _id: '$dealer',
//               count: { $sum: 1 },
//             },
//           }], (err, result) => {
//           CarDealer.populate(result, { path: '_id' }, (err, populatedTransactions) => {
//             // Your populated translactions are inside populatedTransactions
//             if (err) res.json(err);
//             res.json(populatedTransactions);
//           });
//
//         });
//       break;
//     }
//     case 'total': {
//       // sum of total amount per dealer
//       CarBilling
//         .aggregate([
//           {
//             $group: {
//               _id: '$dealer',
//               total: { $sum: '$totalAmount' },
//             },
//           },
//         ], (err, result) => {
//           CarDealer.populate(result, { path: '_id' }, (err, populatedTransactions) => {
//             // Your populated translactions are inside populatedTransactions
//             if (err) res.json(err);
//             res.json(populatedTransactions);
//           });
//         });
//       break;
//     }
//     default:
//       res.json('invalid type');
//   }
// };
