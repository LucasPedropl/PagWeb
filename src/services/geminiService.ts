import { GoogleGenAI } from "@google/genai";

export const generateReportAnalysis = async (reportType: string, contextData: string): Promise<string> => {
  // Verifica a chave dinamicamente no momento da execução
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.warn("Gemini API Key is missing. Returning mock analysis.");
    return `### Modo Demonstração (Sem IA)

**Aviso:** A chave de API do Google Gemini não foi configurada.

**Análise Simulada para ${reportType}:**
* **Tendência:** Os dados indicam estabilidade com viés de alta nos últimos 30 dias.
* **Destaque:** O custo de aquisição (CAC) reduziu em 5%, otimizando a margem.
* **Recomendação:** Focar em estratégias de retenção para maximizar o LTV neste trimestre.

*(Para ativar a inteligência real, configure a variável de ambiente API_KEY)*`;
  }

  try {
    // Inicializa o cliente apenas quando necessário e seguro
    const ai = new GoogleGenAI({ apiKey });

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
    return "Falha ao conectar com a IA. Verifique sua conexão ou chave de API.";
  }
};