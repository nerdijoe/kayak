const router = require('express').Router();
const helper = require('../helpers/authVerify');
const hotelBillingController = require('../controllers/hotelBillings');
// User
router.get('/user', helper.auth, hotelBillingController.getUserBillings);
router.post('/book', helper.auth, hotelBillingController.book);

// Admin
router.get('/', helper.authAdmin, hotelBillingController.getAll);
router.get('/aggregate/:type', helper.authAdmin, hotelBillingController.aggregate);
router.get('/:billingId', helper.authAdmin, hotelBillingController.getOne);

module.exports = router;
