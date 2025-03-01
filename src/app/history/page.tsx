"use client"

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import CopyButton from '@/components/CopyButton';

interface Tweet {
  id: string;
  content: string;
  created_at: string;
}

export default function HistoryPage() {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    // Fetch saved tweets from the API
    const fetchTweets = async () => {
      const response = await fetch('/api/history');
      const data = await response.json();
      setTweets(data);
    };
    fetchTweets();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-2xl font-bold">Saved Tweets</h1>
      <div className="mt-4 w-full max-w-md">
        {tweets.map((tweet) => (
          <div key={tweet.id} className="border p-4 mb-2">
            <p>{tweet.content}</p>
            <p className="text-gray-500 text-sm">{new Date(tweet.created_at).toLocaleString()}</p>
            <CopyButton text={tweet.content} className="mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
