export async function fetchTweetsFromNitter(referenceHandle: string): Promise<string[]> {
  const response = await fetch(`https://nitter.net/${referenceHandle}/rss`);
  const data = await response.text();
  // Parse the RSS feed and extract tweet content
  const tweets = data.match(/<title>(.*?)<\/title>/g)?.map(title => title.replace(/<title>|<\/title>/g, '')) || [];
  return tweets.slice(0, 5).map(tweet => `Tweet: ${tweet}`); // Return the latest 5 tweets as an array
} 