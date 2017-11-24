const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = {
  auth: (req, res, next) => {
    jwt.verify(req.headers.token, process.env.JWT_KEY, (err, decoded) => {
      if (decoded) {
        req.decoded = decoded;
        console.log('helper auth req.decoded=', req.decoded);
        next();
      } else {
        res.send({ message: 'Please Sign In' });
      }
    });
  },
  authAdmin: (req, res, next) => {
    jwt.verify(req.headers.token, process.env.JWT_KEY_ADMIN, (err, decoded) => {
      if (decoded) {
        req.decoded = decoded;
        console.log('helper auth req.decoded=', req.decoded);
        next();
      } else {
        res.send({ message: 'Please Sign In' });
      }
    });
  },

};
