
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
      description: "Real-world search queries where this brand is a primary cited answer in AI responses."
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
  // Always create a fresh instance for the latest API key context
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `Perform a high-fidelity AEO (Answer Engine Optimization) audit for: "${brandOrUrl}".
    
    CRITICAL INSTRUCTIONS:
    1. Use the googleSearch tool to verify if this brand/website actually exists.
    2. Check for Knowledge Graph entries, Featured Snippets, and citations in major tech/industry publications.
    3. If the brand has NO digital footprint or cannot be verified, return scores of 0 and an empty topQueries list. Do not make up data.
    4. For OpenAI (ChatGPT), Perplexity, and Gemini, identify 3-5 specific user queries (e.g., "Best [Industry] software", "[Brand] vs [Competitor]") where this brand is currently ranking or cited.
    
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

    // Extract real grounding sources from the tool output
    const sources: GroundingSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title || "Verified Search Result",
            uri: chunk.web.uri
          });
        }
      });
    }

    // De-duplicate sources
    const uniqueSources = sources.filter((v, i, a) => a.findIndex(t => t.uri === v.uri) === i).slice(0, 6);
    
    const parsed = JSON.parse(response.text.trim());
    return {
      ...parsed,
      groundingSources: uniqueSources,
      url: brandOrUrl.includes('.') ? brandOrUrl : `${brandOrUrl.toLowerCase().replace(/\s/g, '')}.com`,
      date: new Date().toLocaleDateString('en-GB'),
    };
  } catch (error) {
    console.error("GEO Audit failed:", error);
    // Return empty/error state instead of fake data
    return {
      brand: brandOrUrl,
      url: brandOrUrl,
      date: new Date().toLocaleDateString('en-GB'),
      overallScore: 0,
      summary: "Verification failed. We could not find a verified digital footprint for this brand using real-time search grounding. This typically occurs for non-existent brands or websites that are not yet indexed in major citation engines.",
      insights: ["Entity not found in Knowledge Graph", "Zero verified citations detected", "No ranking intent found"],
      groundingSources: [],
      providers: {
        openai: { overallScore: 0, statusText: "No Footprint", brandRecognition: 0, marketScore: 0, presenceQuality: 0, brandSentiment: 0, shareOfVoice: 0, topQueries: [] },
        perplexity: { overallScore: 0, statusText: "No Footprint", brandRecognition: 0, marketScore: 0, presenceQuality: 0, brandSentiment: 0, shareOfVoice: 0, topQueries: [] },
        gemini: { overallScore: 0, statusText: "No Footprint", brandRecognition: 0, marketScore: 0, presenceQuality: 0, brandSentiment: 0, shareOfVoice: 0, topQueries: [] }
      },
      recommendations: ["Ensure the site is indexed in Google", "Build entity authority via high-trust sources", "Check technical Schema markup"]
    };
  }
};
