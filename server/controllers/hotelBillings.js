const mongoose = require('mongoose');
const moment = require('moment');

const Hotel = require('../models/mongooseHotel');
const HotelBilling = require('../models/mongooseHotelBilling');


// User
// router.get('/user', helper.auth, hotelBillingController.getUserBillings);
exports.getUserBillings = (req, res) => {
  console.log('getUserBillings req.decoded.id=', req.decoded.id);
  const userId = req.decoded.id;

  HotelBilling
    .find({ userId })
    .populate('hotel')
    .populate('room')
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
  const id = mongoose.Types.ObjectId(req.body.hotelId);

  const data = req.body;

  Hotel
    .findById(id)
    .exec((err, hotel) => {
      console.log(hotel);
      if (err) res.json(err);

      const startDate = moment(data.startDate, 'MM/DD/YYYY');
      const endDate = moment(data.endDate, 'MM/DD/YYYY');
      const daysBooked = endDate.diff(startDate, 'days');

      console.log(`data.startDate = [${data.startDate}], data.endDate=[${data.endDate}]`);
      console.log(`startDate = [${startDate}], endDate=[${endDate}]`);
      console.log('    daysBooked = ', daysBooked);


      const booking = HotelBilling({
        userId: req.decoded.id,
        hotel,
        room: data.room,
        startDate: data.startDate,
        endDate: data.endDate,
        daysBooked,
        qtyBooked: data.qtyBooked,
        priceBooked: data.room.price,
        totalAmount: (data.room.price * daysBooked * data.qtyBooked),
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

  HotelBilling
    .find({})
    // .where('dealer').equals(mongoose.Types.ObjectId('5a0ea59c0837c46a7e3f11f5'))
    .populate('hotel')
    .populate('room')
    .exec((err, results) => {
    console.log('getAll results=', results);
  if (err) res.json(err);
  res.json(results);
});
};

// router.get('/:billingId', helper.authAdmin, hotelBillingController.getOne);
exports.getOne = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.billingId);

  HotelBilling
    .findById(id)
    .populate('hotel')
    .populate('room')
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
