const express = require('express');
const commentsCtrl = require('../controllers/commentsCtrl');
const checkCommentAuthor = require('../middleware/checkCommentAuthor');

const router = express.Router({ mergeParams: true });

router.post('/', commentsCtrl.create);
router.put('/:commentId', checkCommentAuthor, commentsCtrl.update);
router.delete('/:commentId', checkCommentAuthor, commentsCtrl.delete);

module.exports = router;
