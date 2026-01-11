
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateWarmGreeting = async (nickname: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `你是一个温暖、充满爱心的智能伴侣。用户刚才点击了“我还活着”签到按钮。
      请为用户 ${nickname || '朋友'} 写一句简短、正向、治愈的每日问候语。
      要求：不超过20个字，语气温暖，能给人力量或安慰，不要包含任何负面联想。`,
    });
    return response.text || "看到你安好，真的很开心。";
  } catch (error) {
    console.error("Gemini Greeting Error:", error);
    return "今天也要记得爱自己，平安是最大的幸福。";
  }
};
