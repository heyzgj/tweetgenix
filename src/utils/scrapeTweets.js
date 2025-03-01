// utils/scrapeTweets.js
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

export default async function scrapeTweets(username) {
  // 启动无头浏览器
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  // 设置一个常见的移动设备的 User-Agent
  await page.setUserAgent(
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) ' +
    'AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 ' +
    'Mobile/15E148 Safari/604.1'
  );

  // 访问指定用户的推文页面
  const url = `https://twitter.com/${username}`;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.waitForSelector('article', { timeout: 30000 });

  // 提取推文文本
  const tweets = await page.evaluate(() => {
    const tweetElements = document.querySelectorAll('article div[lang]');
    return Array.from(tweetElements).map(el => el.innerText);
  });

  await browser.close();
  return tweets;
}