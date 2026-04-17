const express = require('express');
const router = express.Router();
const CodeReview = require('../models/CodeReview');

// GET all code reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await CodeReview.find().sort({ createdAt: -1 }); // Sort newest first
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching reviews', details: err });
  }
});

module.exports = router;