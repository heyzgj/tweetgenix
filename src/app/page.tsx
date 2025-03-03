"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Clock, User, ArrowRight, Heart, Repeat, MessageSquare, Share, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// 定义 Tweet 类型
interface Tweet {
  id: string;
  content: string;
  created_at: string;
}

export default function Home() {
  const [tweetIdea, setTweetIdea] = useState("");
  const [referenceTweet, setReferenceTweet] = useState("");
  const [length, setLength] = useState("short");
  const [generatedTweet, setGeneratedTweet] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [savedTweets, setSavedTweets] = useState<Tweet[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const observer = useRef<IntersectionObserver | null>(null);
  const lastTweetElementRef = useCallback((node: HTMLElement | null) => {
    if (isLoadingMore) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreTweets();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isLoadingMore, hasMore]);

  useEffect(() => {
    // Initial fetch of saved tweets
    fetchSavedTweets();
  }, []);

  const fetchSavedTweets = async () => {
    try {
      // Fetch first 5 tweets
      const response = await fetch(`/api/history?page=1&limit=5`);
      if (response.ok) {
        const data = await response.json();
        setSavedTweets(data);
        setHasMore(data.length === 5); // If we got less than 5, there's no more
      }
    } catch (error) {
      console.error('Error fetching saved tweets:', error);
    }
  };
  
  const loadMoreTweets = async () => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const response = await fetch(`/api/history?page=${nextPage}&limit=5`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setSavedTweets(prev => [...prev, ...data]);
          setPage(nextPage);
          setHasMore(data.length === 5);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('Error loading more tweets:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleGenerate = async () => {
    if (!tweetIdea.trim()) return;
    
    setIsStreaming(true);
    setGeneratedTweet("");
    
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: tweetIdea,
          length,
          reference_tweet: referenceTweet,
        }),
      });

      if (!response.body) {
        setIsStreaming(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value);
        setGeneratedTweet(prev => prev + chunk);
      }
      
      setIsStreaming(false);
      
      // Automatically save the generated tweet after completion
      if (generatedTweet) {
        saveGeneratedTweet(generatedTweet);
      }
    } catch (error) {
      console.error('Error generating tweet:', error);
      setIsStreaming(false);
    }
  };
  
  const saveGeneratedTweet = async (content: string) => {
    try {
      const response = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          prompt: tweetIdea,
          reference_tweet: referenceTweet,
          length,
        }),
      });
      
      if (response.ok) {
        // Refresh the list of saved tweets
        fetchSavedTweets();
      }
    } catch (error) {
      console.error('Error saving tweet:', error);
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedTweet);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with login */}
      <header className="sticky top-0 z-10 border-b border-neutral-800 flex justify-between items-center px-4 py-3 bg-black/80 backdrop-blur">
        <div className="flex items-center">
          <X className="h-6 w-6 text-white" />
          <span className="ml-2 font-bold">TweetGenix</span>
        </div>
        <Button variant="default" size="sm" className="rounded-full bg-white text-black hover:bg-white/90 font-bold">
          <User className="h-4 w-4 mr-2" />
          Login
        </Button>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Generate <span className="text-blue-400">Engaging Posts</span> in Seconds</h1>
        <p className="text-neutral-400 text-lg mb-8">Leverage AI to create content that resonates with your audience</p>
      </section>

      {/* Tweet Generation Section */}
      <section className="px-4 py-8 max-w-xl mx-auto">
        <Card className="mb-8 border-0 bg-black rounded-xl shadow-none">
          <CardHeader className="pb-2">
            <h3 className="font-bold text-xl">Create Your Post</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-300">Your post idea</label>
                <Textarea 
                  placeholder="What do you want to post about?"
                  value={tweetIdea}
                  onChange={(e) => setTweetIdea(e.target.value)}
                  rows={3}
                  className="resize-none bg-black border-neutral-800 focus:border-neutral-700 rounded-xl placeholder:text-neutral-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-300">Reference post (optional)</label>
                <Textarea 
                  placeholder="Paste a post you like as reference"
                  value={referenceTweet}
                  onChange={(e) => setReferenceTweet(e.target.value)}
                  rows={2}
                  className="resize-none bg-black border-neutral-800 focus:border-neutral-700 rounded-xl placeholder:text-neutral-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-300">Post length</label>
                <Tabs defaultValue="short" value={length} onValueChange={setLength} className="w-full">
                  <TabsList className="grid grid-cols-3 mb-2 bg-neutral-900 p-1 rounded-full">
                    <TabsTrigger value="short" className="font-medium rounded-full data-[state=active]:bg-neutral-800">Short</TabsTrigger>
                    <TabsTrigger value="medium" className="font-medium rounded-full data-[state=active]:bg-neutral-800">Medium</TabsTrigger>
                    <TabsTrigger value="long" className="font-medium rounded-full data-[state=active]:bg-neutral-800">Long</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-4">
            <Button 
              className="w-full rounded-full bg-white text-black hover:bg-white/90 font-bold text-md py-5"
              onClick={handleGenerate}
              disabled={isStreaming || tweetIdea.trim() === ""}
            >
              {isStreaming ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-black border-t-transparent rounded-full"></div>
                  Generating...
                </div>
              ) : (
                <>
                  Generate Post <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Generated Tweet Preview */}
        {generatedTweet && (
          <div className="mb-12">
            <h3 className="font-bold text-xl mb-4">Your Generated Post</h3>
            <div className="border border-neutral-800 rounded-xl overflow-hidden">
              <div className="p-4">
                <div className="flex">
                  <Avatar className="h-10 w-10 mr-3 rounded-full">
                    <AvatarFallback className="bg-neutral-800 text-white font-bold">YN</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-white flex items-center">
                          Your Name
                          <div className="ml-0.5 text-neutral-400">
                            <span className="mx-1">·</span>
                          </div>
                          <span className="text-neutral-500 font-normal text-sm">
                            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <div className="text-neutral-500 text-sm">@yourhandle</div>
                      </div>
                      <button 
                        onClick={handleCopy}
                        className="text-neutral-500 hover:text-blue-400 transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          {isCopied ? (
                            <>
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </>
                          ) : (
                            <>
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </>
                          )}
                        </svg>
                      </button>
                    </div>
                    <div className="mt-2 mb-3 text-white whitespace-pre-wrap">{generatedTweet}</div>
                    <div className="flex justify-between text-neutral-500 mt-4">
                      <button className="flex items-center hover:text-blue-400 transition">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span className="text-xs">0</span>
                      </button>
                      <button className="flex items-center hover:text-green-400 transition">
                        <Repeat className="h-4 w-4 mr-1" />
                        <span className="text-xs">0</span>
                      </button>
                      <button className="flex items-center hover:text-pink-600 transition">
                        <Heart className="h-4 w-4 mr-1" />
                        <span className="text-xs">0</span>
                      </button>
                      <button className="flex items-center hover:text-blue-400 transition">
                        <Bookmark className="h-4 w-4 mr-1" />
                      </button>
                      <button className="flex items-center hover:text-blue-400 transition">
                        <Share className="h-4 w-4 mr-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* History Section */}
      <section className="px-4 py-8 max-w-xl mx-auto border-t border-neutral-800">
        <div className="flex items-center mb-6">
          <Clock className="mr-2 h-5 w-5 text-blue-400" />
          <h2 className="text-xl font-bold">Generation History</h2>
          <Badge className="ml-2 bg-blue-900/30 text-blue-400 border-0">
            {savedTweets.length}
          </Badge>
        </div>
        
        <div className="space-y-4">
          {savedTweets.map((tweet, index) => (
            <div 
              key={tweet.id} 
              className="border border-neutral-800 rounded-xl overflow-hidden hover:bg-neutral-900/30 transition"
              ref={index === savedTweets.length - 1 ? lastTweetElementRef : null}
            >
              <div className="p-4">
                <div className="flex">
                  <Avatar className="h-8 w-8 mr-3 rounded-full">
                    <AvatarFallback className="bg-neutral-800 text-white font-bold text-sm">YN</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-white flex items-center text-sm">
                          Your Name
                          <div className="ml-0.5 text-neutral-400">
                            <span className="mx-1">·</span>
                          </div>
                          <span className="text-neutral-500 font-normal text-xs">
                            {new Date(tweet.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <div className="text-neutral-500 text-xs">@yourhandle</div>
                      </div>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(tweet.content);
                        }}
                        className="text-neutral-500 hover:text-blue-400 transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="mt-1 mb-2 text-white text-sm whitespace-pre-wrap">{tweet.content}</div>
                    <div className="flex justify-between text-neutral-500 mt-3">
                      <button className="flex items-center hover:text-blue-400 transition">
                        <MessageSquare className="h-3 w-3 mr-1" />
                      </button>
                      <button className="flex items-center hover:text-green-400 transition">
                        <Repeat className="h-3 w-3 mr-1" />
                      </button>
                      <button className="flex items-center hover:text-pink-600 transition">
                        <Heart className="h-3 w-3 mr-1" />
                      </button>
                      <button className="flex items-center hover:text-blue-400 transition">
                        <Bookmark className="h-3 w-3 mr-1" />
                      </button>
                      <button className="flex items-center hover:text-blue-400 transition">
                        <Share className="h-3 w-3 mr-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoadingMore && (
            <div className="text-center py-4">
              <div className="animate-spin mx-auto h-6 w-6 border-2 border-neutral-600 border-t-blue-400 rounded-full"></div>
              <p className="text-neutral-400 mt-2 text-sm">Loading more posts...</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 p-6 text-center text-neutral-500 text-sm bg-black">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-center mb-3">
            <X className="h-5 w-5" />
          </div>
          <p>© {new Date().getFullYear()} TweetGenix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}