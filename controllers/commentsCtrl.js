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

module.exports = {
  create,
};
