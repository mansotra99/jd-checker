const express = require('express');
const multer = require('multer');
const { initTRPC } = require('@trpc/server');
const { z } = require('zod');
const pdfParse = require('pdf-parse');
const axios = require('axios');
require('dotenv').config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// tRPC setup
const t = initTRPC.create();
const GEMINI_API_URL = process.env.GEMINI_API_URL;
const GEMINI_API_TOKEN = process.env.GEMINI_API_TOKEN;

// Import API routes
const apiRoutes = require('./routes/api');

// Use API routes
app.use('/match', upload.fields([
  { name: 'jobDescription', maxCount: 1 },
  { name: 'cv', maxCount: 1 },
]), apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 