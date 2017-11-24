const router = require('express').Router();
const helper = require('../helpers/authVerify');
const carController = require('../controllers/cars');

router.post('/', carController.create);
router.get('/', carController.getAll);
router.post('/search', carController.search);
router.get('/:id', carController.getOne);
router.put('/:id', carController.edit);
router.delete('/:id', carController.delete);

module.exports = router;
