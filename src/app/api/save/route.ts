import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export async function POST(request: Request) {
  const { content, prompt, reference_handle, length } = await request.json();

  // Save the tweet to Supabase
  const { data, error } = await supabase
    .from('tweets')
    .insert([{ content, prompt, reference_handle, length }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
} 