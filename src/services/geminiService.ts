import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateReportAnalysis = async (reportType: string, contextData: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a senior financial analyst for a SaaS company. Analyze the following data context for a "${reportType}" report: ${contextData}`,
      config: {
        systemInstruction: "Format the output in concise Markdown using bolding for key metrics. Provide 3 bullet points of insights and 1 actionable recommendation.",
        temperature: 0.3,
      }
    });

    return response.text || "Não foi possível gerar a análise no momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Falha ao conectar com a IA. Tente novamente mais tarde.";
  }
};