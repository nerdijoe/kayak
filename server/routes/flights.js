const router = require('express').Router();
const flightController = require('../controllers/flights');

router.post('/', flightController.create);
router.get('/', flightController.getAll);
router.get('/airports', flightController.getAllAirports);
router.get('/airlines', flightController.getAllAirlines);

router.get('/search', flightController.search);
router.get('/:id', flightController.getOne);
router.put('/:id', flightController.edit);
router.delete('/:id', flightController.delete);

module.exports = router;
