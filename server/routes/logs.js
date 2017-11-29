const router = require('express').Router();
const logPages = require('../controllers/logPages');

router.post('/pages', logPages.create);
router.get('/pages', logPages.getAll);
// router.get('/search', carController.searchByQuery);
// router.post('/search', carController.search);
// router.get('/:id', carController.getOne);
// router.put('/:id', carController.edit);
// router.delete('/:id', carController.delete);

module.exports = router;
