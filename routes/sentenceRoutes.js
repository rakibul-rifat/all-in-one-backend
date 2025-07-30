// routes/sentenceRoutes.js
const express = require("express");
const router = express.Router();
const Sentence = require("../models/Sentence");

// GET /api/sentences/random
router.get("/random", async (req, res) => {
  try {
    const count = await Sentence.countDocuments();
    const random = Math.floor(Math.random() * count);
    const sentence = await Sentence.findOne().skip(random);
    res.json(sentence);
  } catch (err) {
    console.error("❌ Error fetching sentence:", err);
    res.status(500).json({ error: "Failed to fetch sentence" });
  }
});

module.exports = router;
