const Hoot = require('../models/hoot');

async function checkCommentAuthor(req, res, next) {
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    const comment = hoot.comments.id(req.params.commentId);

    // ensures the current user is the author of the comment
    if (comment.author.toString() !== req.user._id) {
      return res.status(403).json({ err: 'You are not authorized to edit this comment' });
    }

    // OPTIONAL TO PASS THE REFERENCE
    // req.comment = comment;
    // req.hoot = comment;

    next();
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
}

module.exports = checkCommentAuthor;
