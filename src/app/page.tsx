"use client"

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/generate');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-purple-300">
      <Card className="p-6 shadow-lg rounded-lg transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-gray-800">TweetGenix</h1>
        <p className="mt-2 text-gray-700">Learn how to generate tweets with AI. Follow the steps below:</p>
        <ul className="mt-2 text-gray-700 list-disc list-inside">
          <li>1. Enter your tweet idea in the input box.</li>
          <li>2. Optionally, paste a reference tweet.</li>
          <li>3. Select the desired length of your tweet.</li>
          <li>4. Click 'Generate' to create your tweet.</li>
          <li>5. Save or copy your generated tweet!</li>
        </ul>
        <Button className="mt-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300" onClick={handleGetStarted}>Get Started</Button>
      </Card>
    </div>
  );
}
