const router = require('express').Router();

const userController = require('../controllers/users');

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.put('/:id', userController.edit);
router.delete('/:id', userController.delete);

module.exports = router;
