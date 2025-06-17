const express = require('express');
const router = express.Router();
const { analyzeCVService } = require('../services/analyzeCVService');

router.post('/jd', async (req, res) => {
  try {
    const jobDescription = req.files['jobDescription'][0].buffer;
    const cv = req.files['cv'][0].buffer;
    const result = await analyzeCVService({ jobDescription, cv });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 