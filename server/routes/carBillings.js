const router = require('express').Router();
const helper = require('../helpers/authVerify');
const carBillingController = require('../controllers/carBillings');

// only get user's car billings
// router.get('/', helper.auth, carBillingController.book);

// User
router.get('/user', helper.auth, carBillingController.getUserBillings);
router.post('/book', helper.auth, carBillingController.book);

// Admin
router.get('/', helper.authAdmin, carBillingController.getAll);
router.get('/aggregate/:type', helper.authAdmin, carBillingController.aggregate);
router.get('/:billingId', helper.authAdmin, carBillingController.getOne);

module.exports = router;
