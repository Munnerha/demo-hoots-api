const express = require('express');
const commentsCtrl = require('../controllers/commentsCtrl');

const router = express.Router({ mergeParams: true });

router.post('/', commentsCtrl.create);

module.exports = router;
