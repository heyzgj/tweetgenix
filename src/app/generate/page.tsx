"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import TweetDisplay from "@/components/TweetDisplay";
import CopyButton from "@/components/CopyButton";
import SaveButton from "@/components/SaveButton";

export default function GeneratePage() {
  const [tweetIdea, setTweetIdea] = useState("");
  const [referenceTweet, setReferenceTweet] = useState("");
  const [length, setLength] = useState("short");
  const [generatedTweet, setGeneratedTweet] = useState("");

  const handleGenerate = async () => {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: tweetIdea, length, reference_tweet: referenceTweet }),
    });
    const data = await response.json();
    if (response.ok) {
      setGeneratedTweet(data.tweet);
    } else {
      alert(data.error);
    }
  };

  const handleSave = async () => {
    const response = await fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: generatedTweet, prompt: tweetIdea, reference_tweet: referenceTweet, length }),
    });
    const data = await response.json();
    if (response.ok) {
      alert('Tweet saved!');
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-2xl font-bold">Generate Tweet</h1>

      <Input
        placeholder="Your tweet idea"
        value={tweetIdea}
        onChange={(e) => setTweetIdea(e.target.value)}
        className="mt-4"
      />
      
      <Input
        placeholder="Paste reference tweet here"
        value={referenceTweet}
        onChange={(e) => setReferenceTweet(e.target.value)}
        className="mt-4"
      />

      <Select value={length} onValueChange={setLength}>
        <SelectTrigger className="mt-4">
          <SelectValue placeholder="Select Length" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="short">Short</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="long">Long</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={handleGenerate} className="mt-4">Generate</Button>
      <TweetDisplay tweet={generatedTweet} onChange={(e) => setGeneratedTweet(e.target.value)} className="mt-4" />
      <CopyButton text={generatedTweet} className="mt-4" />
      <SaveButton text={generatedTweet} onSave={handleSave} className="mt-4" />
    </div>
  );
}