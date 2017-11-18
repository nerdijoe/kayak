const router = require('express').Router();
const helper = require('../helpers/authVerify');
const carBillingController = require('../controllers/carBillings');

// only get user's car billings
// router.get('/', helper.auth, carBillingController.book);

router.get('/all', carBillingController.getAll);
router.get('/user', helper.auth, carBillingController.getUserBillings);

router.get('/aggregate', carBillingController.aggregate);

router.get('/:billingId', carBillingController.getOne);
router.post('/:carId', helper.auth, carBillingController.book);

module.exports = router;
