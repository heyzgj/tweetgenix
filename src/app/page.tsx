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
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <Card className="p-6 shadow-lg">
        <h1 className="text-2xl font-bold">TweetGenix</h1>
        <p className="mt-2 text-gray-600">Generate tweets with AI.</p>
        <Button className="mt-4" onClick={handleGetStarted}>Get Started</Button>
      </Card>
    </div>
  );
}
