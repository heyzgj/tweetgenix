// src/utils/gemini.ts
import { config } from "dotenv";

config(); // 从 .env.local 加载环境变量

export async function callGeminiAPI(
  prompt: string,
  length: string
): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.GEMINI_API_KEY;

  // 注意：使用 Gemini 的流式接口 streamGenerateContent，不再传入 "stream" 字段
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          maxOutputTokens: length === "short" ? 50 : length === "medium" ? 100 : 200,
        },
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Network response was not ok: ${response.status} ${errText}`);
  }

  if (!response.body) {
    throw new Error("Response body is null");
  }

  return response.body;
}