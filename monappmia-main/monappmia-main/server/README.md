Server proxy for Google GenAI

This small Express server exposes endpoints that call Google GenAI using a server-side API key.

Environment:
- GEMINI_API_KEY: your Google GenAI API key (set in environment variables on the server)
- PORT: optional, defaults to 4000

Endpoints:
- GET /api/health -> { ok: true, ai: boolean }
- POST /api/genai/generate -> { model, prompt } returns { text }
- POST /api/genai/generate-comment -> { employeeName, missionName, rating } returns { text }
- POST /api/genai/search-criteria -> { query } returns { json | text }

Run locally:

```bash
# set key and start server
GEMINI_API_KEY="your_key_here" npm run start:server
# or using env file and dotenv if you prefer
```

Security note: keep `GEMINI_API_KEY` secret and do NOT commit it to source control.
