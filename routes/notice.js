
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Notice = require('../models/Notice');

// Public Notices
router.get('/public', async (req, res) => {
  const notices = await Notice.find({ isPrivate: false }).sort({ date: -1 });
  res.json(notices);
});

// Private Notices (auth required)
router.get('/private', async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    jwt.verify(token, 'secret');
    const notices = await Notice.find({ isPrivate: true }).sort({ date: -1 });
    res.json(notices);
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
