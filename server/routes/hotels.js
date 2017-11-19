const router = require('express').Router();
const hotelController = require('../controllers/hotels');

router.post('/', hotelController.create);
router.get('/', hotelController.getAll);
router.get('/:id', hotelController.getOne);
// router.put('/:id', userController.edit);
// router.delete('/:id', userController.delete);

module.exports = router;
