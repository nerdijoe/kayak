const router = require('express').Router();
const passport = require('passport');
const authAdminController = require('../controllers/authAdmin');

router.post('/signup', authAdminController.signup);
router.post('/signin', passport.authenticate('admin', { session: false }), authAdminController.signin);
module.exports = router;
