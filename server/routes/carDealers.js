const router = require('express').Router();

const carDealerController = require('../controllers/carDealers');

router.post('/', carDealerController.create);
router.get('/', carDealerController.getAll);
router.get('/:id', carDealerController.getOne);
// router.put('/:id', carDealerController.edit);
// router.delete('/:id', carDealerController.delete);

module.exports = router;
