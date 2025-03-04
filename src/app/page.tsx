"use client"

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { X, Clock, User, ArrowRight, Heart, Repeat, Reply, Bookmark, Share, Check, Copy, Search } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Define Tweet type
interface Tweet {
  id: string;
  content: string;
  created_at: string;
}

// Tweet content with hover-to-copy functionality
const TweetContent = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false);
  const indicatorRef = useRef<HTMLDivElement>(null);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      
      if (indicatorRef.current) {
        indicatorRef.current.classList.add('copied');
        indicatorRef.current.textContent = 'Copied!';
      }
      
      setTimeout(() => {
        setCopied(false);
        if (indicatorRef.current) {
          indicatorRef.current.classList.remove('copied');
          indicatorRef.current.textContent = 'Click to copy';
        }
      }, 2000);
      
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  
  return (
    <div className="relative group">
      <div 
        className="text-[15px] leading-normal mt-1 cursor-pointer break-words"
        onClick={handleCopy}
      >
        {content}
      </div>
      <div 
        ref={indicatorRef} 
        className={`absolute -right-1 -top-1 px-2 py-1 rounded-md text-xs bg-white shadow-sm border border-[#eff3f4] opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
          copied ? 'text-[#00ba7c]' : 'text-[#536471]'
        }`}
      >
        {copied ? 'Copied!' : 'Click to copy'}
      </div>
    </div>
  );
};

// Tweet component
const TweetCard = ({ tweet }: { tweet: Tweet }) => {
  // Date formatting function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}h`;
    } else if (diffInSeconds < 2592000) {
      return `${Math.floor(diffInSeconds / 86400)}d`;
    } else {
      // Format as "Month Day" format
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  return (
    <div className="hover:bg-muted transition-colors duration-200 px-4 py-3">
      <div className="flex gap-3">
        <div className="shrink-0">
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarFallback className="bg-muted text-muted-foreground">YN</AvatarFallback>
          </Avatar>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1">
            <span className="font-bold hover:underline cursor-pointer">Your Name</span>
            <span className="text-muted-foreground">@yourhandle</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground hover:underline cursor-pointer">{formatDate(tweet.created_at)}</span>
          </div>
          <TweetContent content={tweet.content} />
        </div>
      </div>
    </div>
  );
};

// Loading skeleton for tweets
const TweetSkeleton = () => (
  <div className="tweet-skeleton px-4 py-3 sm:px-5 sm:py-4 -mx-4 sm:-mx-5">
    <div className="skeleton-container flex gap-3 sm:gap-4">
      <div className="skeleton-avatar tweet-skeleton-animate h-9 w-9 sm:h-10 sm:w-10 rounded-full shrink-0"></div>
      <div className="skeleton-user-info flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="skeleton-fullname tweet-skeleton-animate h-4 w-24 rounded-md"></div>
          <div className="skeleton-username tweet-skeleton-animate h-4 w-20 rounded-md"></div>
          <div className="skeleton-timestamp tweet-skeleton-animate h-4 w-12 rounded-md"></div>
        </div>
        <div className="mt-2 space-y-2">
          <div className="skeleton-content tweet-skeleton-animate h-4 w-full rounded-md"></div>
          <div className="skeleton-content tweet-skeleton-animate h-4 w-4/5 rounded-md"></div>
        </div>
        <div className="skeleton-actions flex justify-between mt-4 max-w-md">
          <div className="skeleton-action tweet-skeleton-animate h-8 w-12 rounded-md"></div>
          <div className="skeleton-action tweet-skeleton-animate h-8 w-12 rounded-md"></div>
          <div className="skeleton-action tweet-skeleton-animate h-8 w-12 rounded-md"></div>
          <div className="skeleton-action tweet-skeleton-animate h-8 w-12 rounded-md"></div>
        </div>
      </div>
    </div>
  </div>
);

// Enhanced History component with virtual scrolling
const TweetHistory = ({ tweets = [], onLoadMore, isLoadingMore }: { 
  tweets: Tweet[], 
  onLoadMore: () => void,
  isLoadingMore: boolean
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const loaderRef = useRef<HTMLDivElement>(null);
  
  // Group tweets by month and day
  const groupedTweets = useMemo(() => {
    // First filter tweets if search term exists
    let filteredTweets = tweets;
    if (searchTerm.trim()) {
      filteredTweets = tweets.filter(tweet => 
        tweet.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Group by month
    const byMonth: Record<string, { date: Date, tweets: Record<string, Tweet[]> }> = {};
    
    filteredTweets.forEach(tweet => {
      const date = new Date(tweet.created_at);
      const monthKey = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      const dayKey = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      if (!byMonth[monthKey]) {
        byMonth[monthKey] = { date: date, tweets: {} };
      }
      
      if (!byMonth[monthKey].tweets[dayKey]) {
        byMonth[monthKey].tweets[dayKey] = [];
      }
      
      byMonth[monthKey].tweets[dayKey].push(tweet);
    });
    
    // Sort months by date (newest first)
    return Object.entries(byMonth)
      .sort((a, b) => b[1].date.getTime() - a[1].date.getTime());
  }, [tweets, searchTerm]);
  
  // Setup intersection observer for infinite loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );
    
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [isLoadingMore, onLoadMore]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsSearching(e.target.value.trim() !== '');
  };
  
  return (
    <div className="history-section rounded-lg sm:rounded-xl border border-border bg-background">
      <div className="history-header flex items-center justify-between p-3 sm:p-4 border-b border-border">
        <h2 className="history-title flex items-center text-base sm:text-lg font-semibold">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Tweet History
        </h2>
        <div className="history-controls">
          <div className="history-search relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search history" 
              value={searchTerm}
              onChange={handleSearch}
              className="input-standard h-8 sm:h-9 rounded-full pl-8 sm:pl-9 pr-3 sm:pr-4 text-xs sm:text-sm w-36 sm:w-44"
            />
          </div>
        </div>
      </div>
      
      <div className="history-content divide-y divide-border">
        {groupedTweets.length > 0 ? (
          <>
            {groupedTweets.map(([month, { tweets: dayTweets }]) => (
              <div key={month} className="history-month-section">
                <div className="history-month-header sticky top-0 z-10 bg-background/80 backdrop-blur-sm px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-medium">
                  {month}
                </div>
                
                {Object.entries(dayTweets).map(([day, dayTweetsList]) => (
                  <div key={day} className="tweet-date-group">
                    <div className="px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm text-muted-foreground bg-muted/30">
                      {day}
                    </div>
                    {dayTweetsList.map(tweet => (
                      <TweetCard key={tweet.id} tweet={tweet} />
                    ))}
                  </div>
                ))}
              </div>
            ))}
            
            {/* Loading indicator and intersection observer target */}
            <div ref={loaderRef} className="p-4 sm:p-5 text-center">
              {isLoadingMore ? (
                <div className="skeleton-group space-y-4">
                  <TweetSkeleton />
                  <TweetSkeleton />
                  <TweetSkeleton />
                </div>
              ) : (
                tweets.length > 0 && (
                  <button 
                    onClick={onLoadMore} 
                    className="text-primary text-sm sm:text-base hover:underline"
                  >
                    Load more tweets
                  </button>
                )
              )}
            </div>
          </>
        ) : (
          <div className="history-empty-state flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
            </div>
            <p className="text-base sm:text-lg font-medium mb-2">
              {searchTerm ? 'No tweets match your search.' : 'No saved tweets yet.'}
            </p>
            <p className="text-sm text-muted-foreground">
              {searchTerm ? 'Try different keywords.' : 'Generated tweets will appear here.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

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

  // Generate random engagement numbers for UI display
  const getRandomEngagement = () => {
    return {
      likes: Math.floor(Math.random() * 500),
      replies: Math.floor(Math.random() * 50),
      reposts: Math.floor(Math.random() * 100),
      views: Math.floor(Math.random() * 10000),
    };
  };

  // For generated tweet preview
  const previewTweet: Tweet = {
    id: 'preview',
    content: generatedTweet,
    created_at: new Date().toISOString()
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-[#eff3f4] bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <X className="h-5 w-5" />
            <span className="font-bold">TweetGenix</span>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-[#0f1419] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#272c30]">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Login</span>
            <span className="sm:hidden">Log in</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-screen-xl px-4 py-12">
        <div className="mx-auto max-w-2xl space-y-8">
          {/* Hero */}
          <div className="text-center">
            <h1 className="text-[2rem] font-bold tracking-tight">
              Generate Engaging Tweets in Seconds
            </h1>
            <p className="mt-3 text-[#536471]">
              Leverage AI to create content that resonates with your audience
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl border border-[#eff3f4] bg-white p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Your tweet idea</label>
              <Textarea 
                placeholder="What do you want to tweet about?"
                value={tweetIdea}
                onChange={(e) => setTweetIdea(e.target.value)}
                rows={3}
                className="min-h-[80px] resize-none rounded-xl border-0 bg-[#f7f9f9] px-4 py-3 text-base placeholder:text-[#536471] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Reference tweet (optional)</label>
              <Textarea 
                placeholder="Paste a tweet you like as reference"
                value={referenceTweet}
                onChange={(e) => setReferenceTweet(e.target.value)}
                rows={2}
                className="min-h-[64px] resize-none rounded-xl border-0 bg-[#f7f9f9] px-4 py-3 text-base placeholder:text-[#536471] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tweet length</label>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => setLength('short')}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                    length === 'short' 
                      ? 'bg-[#0f1419] text-white' 
                      : 'bg-[#f7f9f9] hover:bg-[#eff3f4]'
                  }`}
                >
                  Short
                </button>
                <button 
                  onClick={() => setLength('medium')}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                    length === 'medium'
                      ? 'bg-[#0f1419] text-white'
                      : 'bg-[#f7f9f9] hover:bg-[#eff3f4]'
                  }`}
                >
                  Medium
                </button>
                <button 
                  onClick={() => setLength('long')}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                    length === 'long'
                      ? 'bg-[#0f1419] text-white'
                      : 'bg-[#f7f9f9] hover:bg-[#eff3f4]'
                  }`}
                >
                  Long
                </button>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isStreaming || tweetIdea.trim() === ""}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0f1419] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#272c30] disabled:opacity-50"
            >
              {isStreaming ? (
                <div className="flex items-center gap-2">
                  <div className="loading-spinner"></div>
                  Generating...
                </div>
              ) : (
                <>
                  Generate Tweet
                  <ArrowRight className="h-4 w-4 optimize-animation" />
                </>
              )}
            </button>
          </div>

          {/* History Section */}
          <TweetHistory 
            tweets={savedTweets} 
            onLoadMore={loadMoreTweets} 
            isLoadingMore={isLoadingMore}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#eff3f4] py-6 text-center">
        <p className="text-sm text-[#536471]">
          © {new Date().getFullYear()} TweetGenix. All rights reserved.
        </p>
      </footer>
    </div>
  );
}