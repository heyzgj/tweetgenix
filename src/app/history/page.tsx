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
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch saved tweets from the API
    const fetchTweets = async () => {
      const response = await fetch('/api/history');
      const data = await response.json();
      setTweets(data);
    };
    fetchTweets();
  }, []);

  const filteredTweets = tweets.filter(tweet =>
    tweet.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/delete/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setTweets(tweets.filter(tweet => tweet.id !== id));
    } else {
      alert('Failed to delete tweet.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-200 to-pink-300">
      <h1 className="text-3xl font-bold text-gray-800">Saved Tweets</h1>
      <input
        type="text"
        placeholder="Search tweets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-4 p-2 border rounded-lg shadow-md"
      />
      <div className="mt-4 w-full max-w-md">
        {filteredTweets.map((tweet) => (
          <div key={tweet.id} className="border p-4 mb-2 flex justify-between items-center rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 bg-white">
            <div>
              <p>{tweet.content}</p>
              <p className="text-gray-500 text-sm">{new Date(tweet.created_at).toLocaleString()}</p>
            </div>
            <div>
              <CopyButton text={tweet.content} className="mt-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300" />
              <Button className="mt-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300" onClick={() => handleDelete(tweet.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
