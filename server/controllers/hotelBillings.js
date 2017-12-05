const mongoose = require('mongoose');
const moment = require('moment');

const Hotel = require('../models/mongooseHotel');
const HotelBilling = require('../models/mongooseHotelBilling');


// User
exports.cancel = (req, res) => {
    const billingId = req.params.billingId;
    // const userId = req.decoded.id;

    HotelBilling.findByIdAndUpdate(
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

    HotelBilling.findByIdAndUpdate(
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


// router.get('/user', helper.auth, hotelBillingController.getUserBillings);
exports.getUserBillings = (req, res) => {
  console.log('getUserBillings req.decoded.id=', req.decoded.id);
  const userId = req.decoded.id;

  HotelBilling
    .find({ userId })
    .sort({startDate: -1})
    .populate('hotel')
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
        hotelName: hotel.name,
        hotelCity: hotel.city,
        hotel,
        startDate: data.startDate,
        endDate: data.endDate,
        daysBooked,
        qtyBooked: data.qtyBooked,
        priceBooked: hotel.price,
        totalAmount: (hotel.price * daysBooked * data.qtyBooked),
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
    .exec((err, result) => {
      console.log('getOne result=', result);
      if (err) res.json(err);
      res.json(result);
    });
};


// router.get('/aggregate/:type', helper.authAdmin, hotelBillingController.aggregate);
exports.aggregate = (req, res) => {
  const type = req.params.type;

  switch (type) {
    case 'count': {
      // count how many hotels
      HotelBilling
        .aggregate([
          {
            $group: {
              _id: '$hotel',
              count: { $sum: 1 },
            },
          }], (err, result) => {
          Hotel.populate(result, { path: '_id' }, (err, populatedTransactions) => {
            // Your populated translactions are inside populatedTransactions
            if (err) res.json(err);
            res.json(populatedTransactions);
          });

        });
      break;
    }
    case 'total': {
      // sum of total amount per dealer
      HotelBilling
        .aggregate([
          {
            $group: {
              _id: '$hotel',
              total: { $sum: '$totalAmount' },
            },
          },
        ], (err, result) => {
          Hotel.populate(result, { path: '_id' }, (err, populatedTransactions) => {
            // Your populated translactions are inside populatedTransactions
            if (err) res.json(err);
            res.json(populatedTransactions);
          });
        });
      break;
    }
    case 'cumulative': {
      // count how many hotels
      HotelBilling
        .aggregate([
          {
            $group: {
              _id: '',
              count: { $sum: 1 },
              total: { $sum: '$totalAmount' },
              days: { $sum: '$daysBooked' },
              rooms: { $sum: '$qtyBooked' },
              prices: { $sum: '$priceBooked' },

            },
          }], (err, result) => {
          if (err) res.json(err);
          res.json(result[0]);
        });
      break;
    }
    case 'name': {
      // only return 2017 created bookings
      const startDate = new Date(2017, 1, 1);
      const endDate = new Date(2017, 12, 1);
      
      console.log('startDate = ', startDate);
      console.log('endDate=', endDate);
      HotelBilling
        .aggregate(
          [
            { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
            {
              $group: {
                _id: '$hotelName',
                count: { $sum: 1 },
                total: { $sum: '$totalAmount' },
                days: { $sum: '$daysBooked' },
                rooms: { $sum: '$qtyBooked' },
                prices: { $sum: '$priceBooked' },

              },
            },
            {
              $sort: { total: -1 },
            },
          ],
          (err, result) => {
            if (err) res.json(err);
            res.json(result);
          }
        );
      break;
    }

    case 'city': {
      // count how many hotels
      HotelBilling
        .aggregate([
          {
            $group: {
              _id: '$hotelCity',
              count: { $sum: 1 },
              total: { $sum: '$totalAmount' },
              days: { $sum: '$daysBooked' },
              rooms: { $sum: '$qtyBooked' },
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
    case 'custom': {
      // count how many hotels
      HotelBilling
        .aggregate([
          {
            $group: {
              _id: '$hotel',
              count: { $sum: 1 },
              total: { $sum: '$totalAmount' },
              days: { $sum: '$daysBooked' },
              rooms: { $sum: '$qtyBooked' },
              prices: { $sum: '$priceBooked' },

            },
          },
          {
            $sort: { total: -1 },
          },
        ], (err, result) => {
          Hotel.populate(result, { path: '_id' }, (err, populatedTransactions) => {
            // Your populated translactions are inside populatedTransactions
            if (err) res.json(err);
            res.json(populatedTransactions);
          });

        });
      break;
    }
    default:
      res.json('invalid type');
  }
};
