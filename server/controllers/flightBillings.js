const mongoose = require('mongoose');
const moment = require('moment');

const Flight = require('../models/mongooseFlight');
const FlightBilling = require('../models/mongooseFlightBilling');
const Airline = require('../models/mongooseFlightAirline');
const Airport = require('../models/mongooseFlightAirport');

// User
exports.cancel = (req, res) => {
    const billingId = req.params.billingId;
    // const userId = req.decoded.id;

    FlightBilling.findByIdAndUpdate(
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

    FlightBilling.findByIdAndUpdate(
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
  // need to be sorted based on the departureTime
  FlightBilling
    .find({ userId })
    .sort({ startDate: -1 })
    .populate('flight')
    .populate('airline')
    .populate('departureAirport')
    .populate('arrivalAirport')
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

      const booking = FlightBilling({
        userId: req.decoded.id,
        flight,
        flightNumber: flight.flightNumber,
        airline: flight.airline,
        departureAirport: flight.departureAirport,
        arrivalAirport: flight.arrivalAirport,
        departureCity: flight.departureAirport.city,
        departureCountry: flight.departureAirport.country,
        arrivalCity: flight.arrivalAirport.city,
        arrivalCountry: flight.arrivalAirport.country,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        classBooked: flight.class,
        priceBooked: flight.price,
        qtyBooked: data.qtyBooked,
        totalAmount: (flight.price * data.qtyBooked),
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
    .populate('airline')
    .populate('departureAirport')
    .populate('arrivalAirport')
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


exports.aggregate = (req, res) => {
  const type = req.params.type;

  switch (type) {
    case 'cumulative': {
      // count how many hotels
      FlightBilling
        .aggregate([
          {
            $group: {
              _id: '',
              count: { $sum: 1 },
              total: { $sum: '$totalAmount' },
              seats: { $sum: '$qtyBooked' },
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
      FlightBilling
        .aggregate(
          [
            { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
            {
              $group: {
                _id: '$airline',
                count: { $sum: 1 },
                total: { $sum: '$totalAmount' },
                seats: { $sum: '$qtyBooked' },
                prices: { $sum: '$priceBooked' },
              },
            },
            {
              $sort: { total: -1 },
            },
          ],
          (err, result) => {

            Airline.populate(result, { path: '_id' }, (err, populatedTransactions) => {
              // Your populated translactions are inside populatedTransactions
              if (err) res.json(err);
              res.json(populatedTransactions);
            });
  
          }
        );
      break;
    }

    case 'departureairport': {
      // count how many hotels
      FlightBilling
        .aggregate([
          {
            $group: {
              _id: '$departureAirport',
              count: { $sum: 1 },
              total: { $sum: '$totalAmount' },
              seats: { $sum: '$qtyBooked' },
              prices: { $sum: '$priceBooked' },

            },
          },
          {
            $sort: { total: -1 },
          },
        ], (err, result) => {
          Airport.populate(result, { path: '_id' }, (err, populatedTransactions) => {
            // Your populated translactions are inside populatedTransactions
            if (err) res.json(err);
            res.json(populatedTransactions);
          });
        });
      break;
    }
    case 'arrivalairport': {
      // count how many hotels
      FlightBilling
        .aggregate([
          {
            $group: {
              _id: '$arrivalAirport',
              count: { $sum: 1 },
              total: { $sum: '$totalAmount' },
              seats: { $sum: '$qtyBooked' },
              prices: { $sum: '$priceBooked' },

            },
          },
          {
            $sort: { total: -1 },
          },
        ], (err, result) => {
          Airport.populate(result, { path: '_id' }, (err, populatedTransactions) => {
            // Your populated translactions are inside populatedTransactions
            if (err) res.json(err);
            res.json(populatedTransactions);
          });
        });
      break;
    }
    case 'departurecity': {
      // count how many hotels
      FlightBilling
        .aggregate([
          {
            $group: {
              _id: '$departureCity',
              count: { $sum: 1 },
              total: { $sum: '$totalAmount' },
              seats: { $sum: '$qtyBooked' },
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
    case 'arrivalcity': {
      // count how many hotels
      FlightBilling
        .aggregate([
          {
            $group: {
              _id: '$arrivalCity',
              count: { $sum: 1 },
              total: { $sum: '$totalAmount' },
              seats: { $sum: '$qtyBooked' },
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
    case 'class': {
      // count how many hotels
      FlightBilling
        .aggregate([
          {
            $group: {
              _id: '$classBooked',
              count: { $sum: 1 },
              total: { $sum: '$totalAmount' },
              seats: { $sum: '$qtyBooked' },
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
      FlightBilling
        .aggregate([
          {
            $group: {
              _id: '$flight',
              count: { $sum: 1 },
              total: { $sum: '$totalAmount' },
              seats: { $sum: '$qtyBooked' },
              prices: { $sum: '$priceBooked' },

            },
          },
          {
            $sort: { total: -1 },
          },
        ], (err, result) => {
          Flight.populate(result, { path: '_id' }, (err, populatedTransactions) => {
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
