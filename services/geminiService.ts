import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateReportAnalysis = async (reportType: string, contextData: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a senior business analyst. Generate a concise executive summary and 3 key insights for a ${reportType} report based on this raw data context: ${contextData}`,
      config: {
        systemInstruction: "Format the output in Markdown. Be professional, concise, and data-driven.",
        temperature: 0.3,
      }
    });

    return response.text || "No analysis generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate analysis due to an API error.";
  }
};