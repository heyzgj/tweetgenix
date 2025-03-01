// src/app/api/generate/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { callGeminiAPI } from "@/utils/gemini";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

/**
 * 从 buffer 中提取第一个完整的 JSON 对象字符串。
 * 如果找到了完整对象，则返回 { jsonStr, remainingBuffer }，否则返回 null。
 */
function extractNextJSONObject(buffer: string): { jsonStr: string; remainingBuffer: string } | null {
  const startIdx = buffer.indexOf('{');
  if (startIdx === -1) return null;

  let braceCount = 0;
  let endIdx = -1;
  for (let i = startIdx; i < buffer.length; i++) {
    const char = buffer[i];
    if (char === '{') {
      braceCount++;
    } else if (char === '}') {
      braceCount--;
      if (braceCount === 0) {
        endIdx = i;
        break;
      }
    }
  }
  if (endIdx === -1) return null;
  const jsonStr = buffer.substring(startIdx, endIdx + 1);
  const remainingBuffer = buffer.substring(endIdx + 1);
  return { jsonStr, remainingBuffer };
}

export async function POST(request: Request) {
  const { prompt, length, reference_tweet } = await request.json();

  const geminiPrompt = `Generate a ${length} tweet based on the following idea: ${prompt} ${reference_tweet || ""}. Please only output the tweet without any additional information.`;

  const geminiResponseStream = await callGeminiAPI(geminiPrompt, length);

  const encoder = new TextEncoder();
  let fullResponse = "";
  let buffer = "";
  
  const stream = new ReadableStream({
    async start(controller) {
      const reader = geminiResponseStream.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        // 将新读取的文本追加到缓冲区中
        buffer += decoder.decode(value, { stream: true });
        
        // 尝试从 buffer 中提取完整 JSON 对象
        let result = extractNextJSONObject(buffer);
        while (result) {
          const { jsonStr, remainingBuffer } = result;
          try {
            const jsonObj = JSON.parse(jsonStr);
            const candidateText =
              jsonObj?.candidates?.[0]?.content?.parts?.[0]?.text || "";
            fullResponse += candidateText;
            controller.enqueue(encoder.encode(candidateText));
          } catch (err) {
            console.error("Error parsing JSON:", err, "JSON String:", jsonStr);
          }
          buffer = remainingBuffer;
          result = extractNextJSONObject(buffer);
        }
      }
      
      // 尝试解析剩余的 buffer
      if (buffer.trim()) {
        const result = extractNextJSONObject(buffer);
        if (result) {
          const { jsonStr } = result;
          try {
            const jsonObj = JSON.parse(jsonStr);
            const candidateText =
              jsonObj?.candidates?.[0]?.content?.parts?.[0]?.text || "";
            fullResponse += candidateText;
            controller.enqueue(encoder.encode(candidateText));
          } catch (err) {
            console.error("Error parsing remaining JSON:", err, "Buffer:", buffer);
          }
        }
      }
      
      controller.close();

      // 流结束后，将完整生成的推文存储到 Supabase
      const { error } = await supabase
        .from("tweets")
        .insert([{ content: fullResponse, prompt, length, reference_tweet }]);
      if (error) {
        console.error("Error saving tweet to Supabase:", error);
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain" },
  });
}