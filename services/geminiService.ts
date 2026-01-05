
import { GoogleGenAI, Type } from "@google/genai";
import { AuditResult, GroundingSource } from "../types";

const providerMetricsSchema = {
  type: Type.OBJECT,
  properties: {
    overallScore: { type: Type.INTEGER },
    statusText: { type: Type.STRING },
    brandRecognition: { type: Type.INTEGER },
    marketScore: { type: Type.INTEGER },
    presenceQuality: { type: Type.INTEGER },
    brandSentiment: { type: Type.INTEGER },
    shareOfVoice: { type: Type.INTEGER },
    topQueries: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Specific questions or keywords where this brand is a top cited answer."
    }
  },
  required: [
    "overallScore",
    "statusText",
    "brandRecognition",
    "marketScore",
    "presenceQuality",
    "brandSentiment",
    "shareOfVoice",
    "topQueries"
  ]
};

export const runGeoAudit = async (brandOrUrl: string): Promise<AuditResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Perform a REAL-TIME AEO (Answer Engine Optimization) audit for: "${brandOrUrl}". 
    
    CRITICAL: 
    1. Use the googleSearch tool to identify the brand's actual search landscape.
    2. For each AI engine (OpenAI, Perplexity, Gemini), determine 3-5 specific user queries (e.g. "What is the best [industry] tool?", "How does [Brand] compare to [Competitor]?") where this brand appears in the AI's response.
    3. If the brand is unknown, return 0 scores and an empty topQueries list.
    4. Provide specific, verified metrics based on the current web footprint.
    
    Return the result as valid JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            brand: { type: Type.STRING },
            summary: { type: Type.STRING },
            overallScore: { type: Type.INTEGER },
            insights: { type: Type.ARRAY, items: { type: Type.STRING } },
            providers: {
              type: Type.OBJECT,
              properties: {
                openai: providerMetricsSchema,
                perplexity: providerMetricsSchema,
                gemini: providerMetricsSchema
              },
              required: ["openai", "perplexity", "gemini"]
            },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["brand", "summary", "overallScore", "insights", "providers", "recommendations"]
        }
      }
    });

    const sources: GroundingSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title || "Search Result",
            uri: chunk.web.uri
          });
        }
      });
    }

    const uniqueSources = sources.filter((v, i, a) => a.findIndex(t => t.uri === v.uri) === i).slice(0, 5);
    const parsed = JSON.parse(response.text.trim());

    return {
      ...parsed,
      groundingSources: uniqueSources,
      url: brandOrUrl.includes('.') ? brandOrUrl : `${brandOrUrl.toLowerCase().replace(/\s/g, '')}.com`,
      date: new Date().toLocaleDateString('en-GB'),
    };
  } catch (error) {
    console.error("GEO Audit failed:", error);
    return {
      brand: brandOrUrl,
      url: brandOrUrl,
      date: new Date().toLocaleDateString('en-GB'),
      overallScore: 0,
      summary: "Verification failed. The brand has no discernible AI footprint or the search was blocked. Ensure the brand name is well-known or the site is indexed.",
      insights: ["Discovery attempt timed out", "Entity footprint not found"],
      groundingSources: [],
      providers: {
        openai: { overallScore: 0, statusText: "Offline", brandRecognition: 0, marketScore: 0, presenceQuality: 0, brandSentiment: 0, shareOfVoice: 0, topQueries: [] },
        perplexity: { overallScore: 0, statusText: "Offline", brandRecognition: 0, marketScore: 0, presenceQuality: 0, brandSentiment: 0, shareOfVoice: 0, topQueries: [] },
        gemini: { overallScore: 0, statusText: "Offline", brandRecognition: 0, marketScore: 0, presenceQuality: 0, brandSentiment: 0, shareOfVoice: 0, topQueries: [] }
      },
      recommendations: ["Check for GSC crawl errors", "Review robots.txt for AI blocking"]
    };
  }
};
