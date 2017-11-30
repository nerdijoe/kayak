const router = require('express').Router();
const logsController = require('../controllers/logs');

router.post('/pages', logsController.createLogPage);
router.get('/pages', logsController.getAllLogPage);
router.get('/pages/:type', logsController.aggregate);

router.get('/searches', logsController.getAllLogSearch);

// router.get('/search', carController.searchByQuery);
// router.post('/search', carController.search);
// router.get('/:id', carController.getOne);
// router.put('/:id', carController.edit);
// router.delete('/:id', carController.delete);

module.exports = router;
