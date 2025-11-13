import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;
let ai;
if (API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
    console.log('GoogleGenAI client initialized');
  } catch (e) {
    console.warn('Failed to initialize GoogleGenAI client:', e);
    ai = undefined;
  }
} else {
  console.warn('GEMINI_API_KEY not set. AI endpoints will return 503.');
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, ai: !!ai });
});

// Generic generate endpoint: accepts { model, prompt }
app.post('/api/genai/generate', async (req, res) => {
  if (!ai) return res.status(503).json({ error: 'AI not configured on server' });
  const { model, prompt } = req.body || {};
  if (!model || !prompt) return res.status(400).json({ error: 'model and prompt required' });
  try {
    const response = await ai.models.generateContent({ model, contents: prompt });
    return res.json({ text: response.text });
  } catch (err) {
    console.error('GenAI error:', err);
    return res.status(500).json({ error: 'internal' });
  }
});

// Convenience endpoint for evaluation comment generation
app.post('/api/genai/generate-comment', async (req, res) => {
  if (!ai) return res.status(503).json({ error: 'AI not configured on server' });
  const { employeeName, missionName, rating } = req.body || {};
  if (!employeeName || !missionName || typeof rating !== 'number') {
    return res.status(400).json({ error: 'employeeName, missionName and numeric rating required' });
  }
  const prompt = `Rédige un bref commentaire d'évaluation professionnelle en français pour un intérimaire nommé ${employeeName} concernant la mission "${missionName}". L'intérimaire a reçu une note de ${rating}/5. Le commentaire doit être concis et constructif.`;
  try {
    const response = await ai.models.generateContent({ model: 'gemini-flash-lite-latest', contents: prompt });
    return res.json({ text: response.text });
  } catch (err) {
    console.error('GenAI error:', err);
    return res.status(500).json({ error: 'internal' });
  }
});

// Endpoint to extract search criteria (returns raw JSON text or null)
app.post('/api/genai/search-criteria', async (req, res) => {
  if (!ai) return res.status(503).json({ error: 'AI not configured on server' });
  const { query } = req.body || {};
  if (!query) return res.status(400).json({ error: 'query required' });

  const prompt = `Analyze the following search query from a company looking for temporary workers and extract structured search criteria in JSON.\nQuery: "${query}"`;
  try {
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    // Try to parse JSON, fallback to raw text.
    try {
      const parsed = JSON.parse(response.text);
      return res.json({ json: parsed });
    } catch (_) {
      return res.json({ text: response.text });
    }
  } catch (err) {
    console.error('GenAI error:', err);
    return res.status(500).json({ error: 'internal' });
  }
});

app.listen(PORT, () => {
  console.log(`GenAI proxy server listening on http://localhost:${PORT}`);
});
