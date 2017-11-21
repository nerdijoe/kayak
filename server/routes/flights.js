const router = require('express').Router();
const flightController = require('../controllers/flights');

router.post('/', flightController.create);
router.get('/', flightController.getAll);
router.get('/airports', flightController.getAllAirports);
router.get('/airlines', flightController.getAllAirlines);
router.get('/:id', flightController.getOne);
// router.put('/:id', userController.edit);
// router.delete('/:id', userController.delete);

module.exports = router;
