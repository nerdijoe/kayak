const router = require('express').Router();

const adminController = require('../controllers/admins');

router.get('/', adminController.getAll);
router.get('/:id', adminController.getOne);
router.put('/:id', adminController.edit);
router.delete('/:id', adminController.delete);

module.exports = router;
