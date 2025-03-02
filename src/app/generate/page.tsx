"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import TweetDisplay from "@/components/TweetDisplay";
import CopyButton from "@/components/CopyButton";
import SaveButton from "@/components/SaveButton";
import { Card } from "@/components/ui/card";

export default function GeneratePage() {
  const [tweetIdea, setTweetIdea] = useState("");
  const [referenceTweet, setReferenceTweet] = useState("");
  const [length, setLength] = useState("short");
  const [generatedTweet, setGeneratedTweet] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const handleGenerate = async () => {
    setGeneratedTweet("");
    setIsStreaming(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: tweetIdea,
        length,
        reference_tweet: referenceTweet,
      }),
    });

    const reader = response.body?.getReader();
    if (!reader) return;
    const decoder = new TextDecoder("utf-8");
    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunk = decoder.decode(value);
      setGeneratedTweet((prev) => prev + chunk);
    }
    setIsStreaming(false);
  };

  const handleSave = async () => {
    const response = await fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: generatedTweet,
        prompt: tweetIdea,
        reference_tweet: referenceTweet,
        length,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Tweet saved!");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-200 to-yellow-300">
      <h1 className="text-3xl font-bold text-gray-800">Generate Tweet</h1>

      <div className="w-full max-w-md mt-4">
        <Card className="p-4 mb-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
          <Input
            placeholder="Your tweet idea"
            value={tweetIdea}
            onChange={(e) => setTweetIdea(e.target.value)}
            className="border rounded-lg p-2"
          />
        </Card>

        <Card className="p-4 mb-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
          <Input
            placeholder="Paste reference tweet here"
            value={referenceTweet}
            onChange={(e) => setReferenceTweet(e.target.value)}
            className="border rounded-lg p-2"
          />
        </Card>

        <Card className="p-4 mb-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
          <Select value={length} onValueChange={setLength}>
            <SelectTrigger>
              <SelectValue placeholder="Select Length" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="long">Long</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        <Button onClick={handleGenerate} className="mt-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300" disabled={isStreaming}>
          {isStreaming ? "Generating..." : "Generate"}
        </Button>

        {isStreaming && <div className="mt-2 animate-pulse">Loading...</div>}

        <TweetDisplay
          tweet={generatedTweet}
          onChange={(e) => setGeneratedTweet(e.target.value)}
          className="mt-4 border rounded-lg p-2"
        />
        <CopyButton text={generatedTweet} className="mt-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300" />
        <SaveButton text={generatedTweet} onSave={handleSave} className="mt-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300" />
      </div>
    </div>
  );
}