const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/auth');

router.post('/signup', authController.signup);
router.post('/signin', passport.authenticate('user', { session: false }), authController.signin);

// router.post('/signup', authController.signupKafka);
// router.post('/signin', passport.authenticate('kafka_user', { session: false }), authController.signinKafka);

module.exports = router;
