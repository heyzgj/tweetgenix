import scrapeTweets from './scrapeTweets'; // 确保路径正确

export async function fetchTweets(referenceHandle: string): Promise<string[]> {
  try {
    const tweets = await scrapeTweets(referenceHandle); // 调用 scrapeTweets 函数
    return tweets.slice(0, 5).map(tweet => `Tweet: ${tweet}`); // 返回前 5 条推文
  } catch (error) {
    console.error('Error fetching tweets:', error);
    return [];
  }
}