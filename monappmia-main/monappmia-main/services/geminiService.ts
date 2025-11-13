import { PerformanceData } from '../types';

// Client-side wrapper that calls the server proxy endpoints added in /server.
// The server holds the GEMINI_API_KEY and performs AI calls.

export interface SearchCriteria {
  searchTerm?: string;
  status?: 'Active' | 'Inactive' | 'All';
  sortBy?: 'name' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

const safeFetch = async (url: string, opts: RequestInit = {}) => {
  const res = await fetch(url, { ...opts, headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed ${res.status}: ${text}`);
  }
  return res.json();
};

export const getSearchCriteriaFromQuery = async (query: string): Promise<SearchCriteria | null> => {
  try {
    const result = await safeFetch('/api/genai/search-criteria', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
    if (result.json) return result.json as SearchCriteria;
    if (result.text) {
      try { return JSON.parse(result.text) as SearchCriteria; } catch { return null; }
    }
    return null;
  } catch (e) {
    console.error('getSearchCriteriaFromQuery error', e);
    return null;
  }
};

export const generateEvaluationComment = async (employeeName: string, missionName: string, rating: number): Promise<string> => {
  try {
    const result = await safeFetch('/api/genai/generate-comment', {
      method: 'POST',
      body: JSON.stringify({ employeeName, missionName, rating }),
    });
    return result.text || `Commentaire automatique indisponible pour ${employeeName}`;
  } catch (e) {
    console.error('generateEvaluationComment error', e);
    return `Commentaire automatique indisponible pour ${employeeName}`;
  }
};

export const analyzePerformanceData = async (data: PerformanceData[]): Promise<string> => {
  try {
    const prompt = `Analyse les données de performance suivantes pour des intérimaires et fournis un résumé des tendances, des causes potentielles de fluctuations, et des informations exploitables. Les données représentent les notes moyennes au fil du temps. Les données sont en français.\n\nDonnées: ${JSON.stringify(data)}\n\nTon analyse doit être structurée, claire, et en français.`;
    const result = await safeFetch('/api/genai/generate', {
      method: 'POST',
      body: JSON.stringify({ model: 'gemini-2.5-pro', prompt }),
    });
    return result.text || 'Analyse automatique indisponible.';
  } catch (e) {
    console.error('analyzePerformanceData error', e);
    return 'Analyse automatique indisponible.';
  }
};


import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { PerformanceData } from '../types';

// NOTE: Do NOT throw at module import time. If the client bundle doesn't have
// an API key (recommended), we should gracefully degrade AI features instead
// of causing the whole app to crash with a top-level exception.
const API_KEY = (typeof process !== 'undefined' && process.env && process.env.API_KEY) ? process.env.API_KEY : undefined;

let ai: GoogleGenAI | undefined;
if (API_KEY) {
    try {
        ai = new GoogleGenAI({ apiKey: API_KEY });
    } catch (e) {
        // If constructing the client fails, log and continue with ai undefined.
        // This prevents the entire app from failing to render in environments where
        // the provider library cannot run (e.g. browser / CORS restrictions).
        // The functions below will check for `ai` and return graceful fallbacks.
        // eslint-disable-next-line no-console
        console.warn('Could not initialize GoogleGenAI client:', e);
        ai = undefined;
    }
} else {
    // eslint-disable-next-line no-console
    console.warn('GEMINI API key not set. AI features are disabled in the client bundle.');
}

export interface SearchCriteria {
    searchTerm?: string;
    status?: 'Active' | 'Inactive' | 'All';
    sortBy?: 'name' | 'rating';
    sortOrder?: 'asc' | 'desc';
}

const searchCriteriaSchema = {
    type: Type.OBJECT,
    properties: {
        searchTerm: {
            type: Type.STRING,
            description: "Extract the specific name or role from the query. For example, if the query is 'find all marketers named sophie', this should be 'sophie marketing'. If no specific term, leave empty."
        },
        status: {
            type: Type.STRING,
            enum: ['Active', 'Inactive', 'All'],
            description: "Filter by worker status. If the query mentions 'active' or 'available', use 'Active'. If it mentions 'inactive', use 'Inactive'. Default to 'All' if not specified."
        },
        sortBy: {
            type: Type.STRING,
            enum: ['name', 'rating'],
            description: "The field to sort by. If the query mentions sorting by name or alphabetically, use 'name'. If it mentions rating, performance, or 'best', use 'rating'. Default to 'name' if not specified."
        },
        sortOrder: {
            type: Type.STRING,
            enum: ['asc', 'desc'],
            description: "The sort order. 'asc' for ascending (A-Z, low to high). 'desc' for descending (Z-A, high to low). If the query mentions 'best' or 'highest rated', use 'desc' for rating. Default to 'asc' for name."
        }
    },
};


export const getSearchCriteriaFromQuery = async (query: string): Promise<SearchCriteria | null> => {
    try {
        if (!ai) {
            // If AI client is not available (e.g. no API key in client bundle),
            // avoid throwing and return null so the app can continue.
            return null;
        }
        const prompt = `Analyze the following search query from a company looking for temporary workers and extract structured search criteria.
        Query: "${query}"
        
        Follow these rules:
        - For 'searchTerm', combine any names and roles mentioned.
        - For 'status', identify if the user wants 'Active' or 'Inactive' workers. Default to 'All'.
        - For 'sortBy', determine if the user wants to sort by 'name' or 'rating'. If they ask for the "best" or "highest-rated" workers, sort by 'rating'. Default to sorting by 'name'.
        - For 'sortOrder', use 'desc' for the highest ratings ('best') and 'asc' for alphabetical sorting by name.
        
        Provide the output in JSON format based on the provided schema.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: searchCriteriaSchema,
            },
        });

        const jsonStr = response.text.trim();
        const criteria = JSON.parse(jsonStr);
        return criteria as SearchCriteria;

    } catch (error) {
        console.error("Error generating search criteria with AI:", error);
        return null;
    }
};

export const generateEvaluationComment = async (employeeName: string, missionName: string, rating: number): Promise<string> => {
  try {
        if (!ai) {
            return `(${employeeName}) - Note: ${rating}/5 — Commentaire automatique désactivé (clé API non fournie).`;
        }

        const prompt = `Rédige un bref commentaire d'évaluation professionnelle en français pour un intérimaire nommé ${employeeName} concernant la mission "${missionName}". L'intérimaire a reçu une note de ${rating}/5. Le commentaire doit être concis et constructif.`;

        import { PerformanceData } from '../types';

        // Client-side proxy to server endpoints. The server (Express) holds the
        // GEMINI_API_KEY and performs the calls to Google GenAI. This avoids
        // exposing secrets in the client bundle.

        export interface SearchCriteria {
            searchTerm?: string;
            status?: 'Active' | 'Inactive' | 'All';
            sortBy?: 'name' | 'rating';
            sortOrder?: 'asc' | 'desc';
        }

        const safeFetch = async (url: string, opts: RequestInit = {}) => {
            try {
                const res = await fetch(url, { ...opts, headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) } });
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`Request failed ${res.status}: ${text}`);
                }
                return res.json();
            } catch (e) {
                console.error('Fetch error:', e);
                throw e;
            }
        };

        export const getSearchCriteriaFromQuery = async (query: string): Promise<SearchCriteria | null> => {
            try {
                const result = await safeFetch('/api/genai/search-criteria', {
                    method: 'POST',
                    body: JSON.stringify({ query }),
                });
                if (result.json) return result.json as SearchCriteria;
                // If server returned raw text, try to parse
                if (result.text) {
                    try {
                        return JSON.parse(result.text) as SearchCriteria;
                    } catch {
                        return null;
                    }
                }
                return null;
            } catch (e) {
                return null;
            }
        };

        export const generateEvaluationComment = async (employeeName: string, missionName: string, rating: number): Promise<string> => {
            try {
                const result = await safeFetch('/api/genai/generate-comment', {
                    method: 'POST',
                    body: JSON.stringify({ employeeName, missionName, rating }),
                });
                return result.text || `Commentaire automatique indisponible pour ${employeeName}`;
            } catch (e) {
                return `Commentaire automatique indisponible pour ${employeeName}`;
            }
        };

        export const analyzePerformanceData = async (data: PerformanceData[]): Promise<string> => {
            try {
                const prompt = `Analyse les données de performance suivantes pour des intérimaires et fournis un résumé des tendances, des causes potentielles de fluctuations, et des informations exploitables. Les données représentent les notes moyennes au fil du temps. Les données sont en français.\\n\\nDonnées: ${JSON.stringify(data)}\\n\\nTon analyse doit être structurée, claire, et en français.`;
                const result = await safeFetch('/api/genai/generate', {
                    method: 'POST',
                    body: JSON.stringify({ model: 'gemini-2.5-pro', prompt }),
                });
                return result.text || 'Analyse automatique indisponible.';
            } catch (e) {
                return 'Analyse automatique indisponible.';
            }
        };