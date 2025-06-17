# Woolf Assignment: AI-Powered CV & Job Description Analyzer

This Node.js server provides a tRPC-powered API endpoint to analyze a candidate's CV and a job description (both as PDFs) using AI. It identifies strengths, weaknesses, and alignment with the job requirements.

## Features
- Upload two PDFs: a job description and a CV
- Uses Gemini 1.5 Flash AI for analysis
- Returns candidate strengths, weaknesses, and fit assessment
- Easy to test and extend
- **Clean project structure:** API routes and business logic are separated for maintainability

## Project Structure

```
.
├── server.js                # Main server entry point
├── routes/
│   └── api.js               # API route for PDF analysis
├── services/
│   └── analyzeCVService.js  # Service layer for PDF/AI logic
├── package.json
├── README.md
└── ...
```

## Setup

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Copy the provided `.env.template` to a new file named `.env`:
     ```bash
     cp .env.template .env
     ```
   - Open `.env` and fill in the required values (e.g., your Gemini API token and URL).

## Usage

### Start the server
```bash
npm run dev   # for development (auto-reloads)
npm start     # for production
```

### API Endpoint
- **POST** `/trpc/analyzeCV`
- **Form Data:**
  - `jobDescription`: PDF file
  - `cv`: PDF file

#### Example with `curl`:
```bash
curl -X POST http://localhost:3000/match/jd \
  -F "jobDescription=@/path/to/job_description.pdf" \
  -F "cv=@/path/to/cv.pdf"
```

#### Response
```json
{
  "strengths": ["..."],
  "weaknesses": ["..."],
  "fitScore": 0.85,
  "summary": "..."
}
```

---

**Replace `your_authorization_token_here` with the provided token.** 