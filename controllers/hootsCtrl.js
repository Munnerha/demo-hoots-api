const Hoot = require('../models/hoot');

const create = async (req, res) => {
  try {
    // grab the user id from the token and add it to the form submission
    req.body.author = req.user._id;

    // Create the new Hoot
    const newHoot = await Hoot.create(req.body);

    // dont populate, becuase we will expose the password (password scrum is on teh user model, but we call .json on the hoot model)

    // newHoot._doc.author = req.user;
    await newHoot.populate('author', 'username');

    res.status(201).json(newHoot);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ err: error.message });
  }
};

const index = async (req, res) => {
  try {
    const hoots = await Hoot.find().populate('author').sort({ createdAt: 'desc' });

    res.status(200).json(hoots);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ err: error.message });
  }
};

const show = async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.id).populate('author');

    res.status(200).json(hoot);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ err: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updatedHoot = await Hoot.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate(
      'author',
      'username'
    );

    res.status(200).json(updatedHoot);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ err: error.message });
  }
};

const deleteHoot = async (req, res) => {
  try {
    await Hoot.findByIdAndDelete(req.params.id);

    res.status(204).end();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ err: error.message });
  }
};

module.exports = { create, index, show, update, delete: deleteHoot };
