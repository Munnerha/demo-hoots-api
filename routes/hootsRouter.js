const express = require('express');
const hootsCtrl = require('../controllers/hootsCtrl');
const checkHootOwner = require('../middleware/checkHootOwner');

const router = express.Router();

router.post('/', hootsCtrl.create);
router.get('/', hootsCtrl.index);
router.get('/:id', hootsCtrl.show);

router.put('/:id', checkHootOwner, hootsCtrl.update);
router.delete('/:id', checkHootOwner, hootsCtrl.delete);

module.exports = router;
