
import { GoogleGenAI, Type } from "@google/genai";

// Ensure the API key is available from environment variables.
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

interface DefinitionResponse {
  definition: string;
  summary: string;
}

export const getFinancialTermDefinition = async (term: string): Promise<DefinitionResponse> => {
  try {
    const prompt = `
      '${term}'이라는 최신 금융 단어의 뜻에 대해 알려줘.

      1.  **정의 (definition)**: 초보자도 이해하기 쉽게 전문적인 금융 사전 형식으로 설명해줘. 응답은 '정의:', '설명:', '중요성/활용:' 형식으로 구성해줘. 마크다운은 사용하지마.
      2.  **요약 (summary)**: 위 내용을 500자 이내로, 핵심만 요약해줘. 중요한 키워드는 마크다운을 사용해서 **굵게** 표시해줘.

      반드시 한국어로 답변하고, 아래 JSON 스키마에 맞춰서 응답해줘.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              definition: {
                type: Type.STRING,
                description: "The full, detailed definition of the financial term in a structured format."
              },
              summary: {
                type: Type.STRING,
                description: "A markdown-formatted summary of the definition, under 500 characters."
              }
            },
            required: ["definition", "summary"]
          }
        }
    });
    
    const jsonText = response.text.trim();
    const result: DefinitionResponse = JSON.parse(jsonText);
    return result;

  } catch (error) {
    console.error("Error fetching definition from Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API 요청 중 오류 발생: ${error.message}`);
    }
    throw new Error("알 수 없는 오류가 발생하여 정의를 가져올 수 없습니다.");
  }
};
