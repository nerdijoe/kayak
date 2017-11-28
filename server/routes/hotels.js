const router = require('express').Router();
const hotelController = require('../controllers/hotels');

router.post('/', hotelController.create);
router.get('/', hotelController.getAll);
router.get('/search', hotelController.search);
router.get('/:id', hotelController.getOne);
router.put('/:id', hotelController.edit);
router.post('/:id/room', hotelController.addRoom);
router.post('/:id/review', hotelController.addReview);

router.delete('/:id', hotelController.delete);

module.exports = router;
