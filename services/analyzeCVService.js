const pdfParse = require('pdf-parse');
const axios = require('axios');

const GEMINI_API_URL = process.env.GEMINI_API_URL;
const GEMINI_API_TOKEN = process.env.GEMINI_API_TOKEN;

async function extractTextFromPDF(buffer) {
  const data = await pdfParse(buffer);
  return data.text;
}

async function analyzeWithGemini(jobText, cvText) {
  const payload = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `You are an experienced technical recruiter and HR analyst.
                Your task is to review a candidate's CV and a corresponding job description. Based on the content of both, return a JSON object with the following structure:

                {
                "strengths": [list of specific strengths aligned with the job description],
                "weaknesses": [list of relevant weaknesses or gaps],
                "fitScore": (integer from 0 to 10, reflecting overall fit),
                "summary": "A brief 2-3 sentence summary of how well the candidate matches the job, highlighting key points."
                }

                Focus on:
                - Technical and domain-specific skills mentioned in both documents
                - Experience level alignment
                - Tools, frameworks, and methodologies overlap
                - Gaps in responsibilities, qualifications, or experience

                Be concise and specific in both lists.

                ---

                Job Description:
                ${jobText}

                CV:
                ${cvText}`
          }
        ]
      }
    ]
  };

  const response = await axios.post(GEMINI_API_URL, payload, {
    headers: {
      'Authorization': `${GEMINI_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
  const resultText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
  try {
    // Try to parse as JSON directly
    return JSON.parse(resultText);
  } catch {
    // Try to extract JSON from markdown/code block
    try {
      const semiParsed = resultText.split('```json')[1].split('```')[0];
      return JSON.parse(semiParsed);
    } catch {
      return { summary: resultText };
    }
  }
}

async function analyzeCVService({ jobDescription, cv }) {
  const jobText = await extractTextFromPDF(jobDescription);
  const cvText = await extractTextFromPDF(cv);
  return await analyzeWithGemini(jobText, cvText);
}

module.exports = { analyzeCVService }; 