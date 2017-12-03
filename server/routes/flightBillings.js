const router = require('express').Router();
const helper = require('../helpers/authVerify');
const flightBillingController = require('../controllers/flightBillings');

// User
router.get('/user', helper.auth, flightBillingController.getUserBillings);
router.post('/book', helper.auth, flightBillingController.book);

// Admin
router.get('/', helper.authAdmin, flightBillingController.getAll);
router.get('/aggregate/:type', helper.authAdmin, flightBillingController.aggregate);
router.get('/:billingId', helper.authAdmin, flightBillingController.getOne);

module.exports = router;
