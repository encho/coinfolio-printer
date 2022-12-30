const puppeteer = require("puppeteer");

async function printOgImage({ firstAsset, secondAsset, timePeriod, endDate }) {
  console.log("printing og-image for correlation visualizer...");

  // default linkedin viewport
  const defaultViewport = {
    height: 627,
    width: 1200,
  };

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--font-render-hinting=none", // from https://docs.browserless.io/blog/2020/09/30/puppeteer-print.html#use-a-special-launch-flag
      "--disable-dev-shm-usage",
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
  });

  const page = await browser.newPage();

  // TODO filename with pars for eventually caching!
  const filePath = `./performance-compare.png`;

  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
  );

  await page.setViewport(defaultViewport);

  const queryParameters = `firstAsset=${firstAsset}&secondAsset=${secondAsset}&endDate=${endDate.toISOString()}&timePeriod=${timePeriod}`;
  const url = `${process.env.NERDY_BASE_URL}/analytics/performance-compare/og-image?${queryParameters}`;

  await page.goto(url);
  await page.waitForSelector("#Tools_PerformanceCompareChart_OgImage");
  await page.waitForTimeout(400);

  const screenshot = await page.screenshot({
    path: filePath,
    type: "png",
  });

  await browser.close();
  return screenshot;
}

async function printChart({ firstAsset, secondAsset, timePeriod, endDate }) {
  console.log("printing chart for correlation visualizer...");

  const defaultViewport = {
    height: 600,
    width: 1000,
  };

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--font-render-hinting=none", // from https://docs.browserless.io/blog/2020/09/30/puppeteer-print.html#use-a-special-launch-flag
      "--disable-dev-shm-usage",
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
  });

  const page = await browser.newPage();

  // TODO filename with pars for eventually caching!
  const filePath = `./performance-compare.png`;

  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
  );

  await page.setViewport(defaultViewport);

  const queryParameters = `firstAsset=${firstAsset}&secondAsset=${secondAsset}&endDate=${endDate.toISOString()}&timePeriod=${timePeriod}`;
  const url = `${process.env.NERDY_BASE_URL}/analytics/performance-compare/embed?${queryParameters}`;

  await page.goto(url);

  await page.waitForSelector("#Tools_PerformanceCompareChart");
  await page.waitForTimeout(400);

  // await page.waitForSelector("#CorrelationToolChart");
  // await page.waitForTimeout(200);
  // await page.waitForTimeout(400);

  const screenshot = await page.screenshot({
    path: filePath,
    type: "png",
  });

  await browser.close();
  return screenshot;
}

module.exports = {
  printOgImage,
  printChart,
};
