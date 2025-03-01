import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

async function scrapeTweets(username) {
  // 启动无头浏览器
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // 设置一个常见的移动设备的 User-Agent，有时 Twitter 会显示部分公开内容给移动用户
  await page.setUserAgent(
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) ' +
    'AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 ' +
    'Mobile/15E148 Safari/604.1'
  );

  // 访问指定用户的推文页面
  const url = `https://x.com/${username}`;
  console.log('Navigating to:', url);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  // 等待页面加载推文（tweet 通常位于 article 标签中）
  await page.waitForSelector('article', { timeout: 30000 });

  // 在页面中提取 tweet 文本（通过查找包含 lang 属性的 div 来粗略提取推文内容）
  const tweets = await page.evaluate(() => {
    const tweetElements = document.querySelectorAll('article div[lang]');
    const tweetTexts = [];
    tweetElements.forEach(el => {
      tweetTexts.push(el.innerText);
    });
    return tweetTexts;
  });

  await browser.close();
  return tweets;
}

(async () => {
  try {
    const username = 'elonmusk'; // 替换成你想抓取的 Twitter 用户名
    const tweets = await scrapeTweets(username);
    console.log('Fetched Tweets:', tweets.slice(0, 5)); // 打印前 5 条
  } catch (error) {
    console.error('Error scraping tweets:', error);
  }
})();