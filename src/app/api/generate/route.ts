import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { callGeminiAPI } from '@/utils/gemini';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

// 定义长度映射
const lengthMapping: { [key: string]: number } = {
  short: 50,
  medium: 100,
  long: 200,
};

export async function POST(request: Request) {
  const { prompt, length, reference_tweet } = await request.json();

  // Create a prompt for Gemini using the user-provided reference tweet
  const geminiPrompt = `${prompt} ${reference_tweet || ''} ${length}`;

  // Call Gemini API to generate a tweet
  const generatedTweet = await callGeminiAPI(geminiPrompt);

  // Save the tweet to Supabase
  const { data, error } = await supabase
    .from('tweets')
    .insert([{ content: generatedTweet, prompt, length, reference_tweet }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ tweet: generatedTweet });
}