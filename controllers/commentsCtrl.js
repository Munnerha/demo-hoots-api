const Hoot = require('../models/hoot');

const create = async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    console.log(req.params);
    if (!hoot) return res.status(404).json({ err: 'Hoot not Found' });

    req.body.author = req.user._id;
    hoot.comments.push(req.body);

    await hoot.save();

    const newComment = hoot.comments[hoot.comments.length - 1];

    newComment._doc.author = req.user;
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

const update = async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    const comment = hoot.comments.id(req.params.commentId);

    comment.text = req.body.text;
    await hoot.save();
    res.status(200).json({ message: 'Comment updated successfully' });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId);

    hoot.comments.remove({ _id: req.params.commentId });
    await hoot.save();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  create,
  update,
  delete: deleteComment,
};
