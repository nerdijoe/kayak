const router = require('express').Router();

const carController = require('../controllers/cars');

router.post('/', carController.create);
router.get('/', carController.getAll);
router.get('/:id', carController.getOne);
// router.put('/:id', userController.edit);
// router.delete('/:id', userController.delete);

module.exports = router;
