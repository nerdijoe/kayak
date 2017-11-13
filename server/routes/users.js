const router = require('express').Router();

const userController = require('../controllers/users');

router.get('/', userController.getUsers);



router.get('/:id', userController.getOneUser);
router.put('/:id', userController.editUser);

module.exports = router;
