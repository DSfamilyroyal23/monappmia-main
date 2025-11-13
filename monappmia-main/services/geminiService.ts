

import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { PerformanceData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd have a more robust way of handling this,
  // but for this environment, we'll throw an error.
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

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
    const prompt = `Rédige un bref commentaire d'évaluation professionnelle en français pour un intérimaire nommé ${employeeName} concernant la mission "${missionName}". L'intérimaire a reçu une note de ${rating}/5. Le commentaire doit être concis et constructif.`;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating evaluation comment:", error);
    return "Désolé, une erreur est survenue lors de la génération du commentaire.";
  }
};

export const analyzePerformanceData = async (data: PerformanceData[]): Promise<string> => {
    try {
        const prompt = `Analyse les données de performance suivantes pour des intérimaires et fournis un résumé des tendances, des causes potentielles de fluctuations, et des informations exploitables. Les données représentent les notes moyennes au fil du temps. Les données sont en français.

        Données: ${JSON.stringify(data)}

        Ton analyse doit être structurée, claire, et en français.`;

        const response: GenerateContentResponse = await ai.models.generateContent({
          model: 'gemini-2.5-pro',
          contents: prompt
        });

        return response.text;
    } catch (error) {
        console.error("Error analyzing performance data:", error);
        return "Désolé, une erreur est survenue lors de l'analyse des données.";
    }
};