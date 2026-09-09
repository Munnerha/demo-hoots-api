const Hoot = require('../models/hoot');

async function checkHootOwner(req, res, next) {
  const hoot = await Hoot.findById(req.params.id);

  // Check permissions:
  if (!hoot.author.equals(req.user._id)) {
    return res.status(403).json({ err: "You're not allowed to do that!" });
  }

  next();
}

module.exports = checkHootOwner;
