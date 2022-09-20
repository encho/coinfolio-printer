const puppeteer = require("puppeteer");

const defaultViewport = {
  height: 627,
  width: 1200,
};

async function printCorrelationVisualizerImage() {
  console.log("about to create correlation visualizre image...");

  // const browser = await puppeteer.launch({ headless: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--font-render-hinting=none", // from https://docs.browserless.io/blog/2020/09/30/puppeteer-print.html#use-a-special-launch-flag
      "--disable-dev-shm-usage",
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
    // userDataDir: pptrCache,
    // ...(isContainer && { executablePath: "google-chrome-stable" }),
  });

  const page = await browser.newPage();

  //   const strategyId = "GOLD_CRYPTO_60_40";
  // const strategyId = "CFBG1";
  // const filePath = `./Coinfolio-${strategyId}-Factsheet.pdf`;

  // TODO filename with pars for eventually caching!
  const filePath = `./correlation-visualizer.png`;

  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
  );

  await page.setViewport(defaultViewport);

  const url = `${process.env.COINFOLIO_BASE_URL}/analytics/correlation-visualizer/embed`;

  await page.goto(
    url
    // `http://localhost:3000/analytics/correlation-visualizer/embed`
    // `${process.env.COINFOLIO_BASE_URL}/analytics/correlation-visualizer/embed`,
    // `https://google.com`
    // `https://coinfolio.capital/bapp/strategies/${strategyId}/factsheet`,
    // {
    //   waitUntil: "networkidle2",
    // }
  );

  //   await page.emulateMediaType("print");
  //   await page.evaluate(() => matchMedia("print").matches);
  //   await page.evaluate();

  // TODO eventually wait for a specific selector! and replace the time based waiting
  await page.waitForTimeout(500);
  // await page.waitForSelector("#SmallPerformanceChart");

  const screenshot = await page.screenshot({
    path: filePath,
    type: "png",
    // omitBackground: true,
    // type: "png",
    // clip: { ...boundingBox, height: boundingBox.height },
  });

  // const pdf = await page.pdf({
  //   printBackground: true,
  //   path: filePath,
  //   preferCSSPageSize: true,
  //   // format: "A4",
  //   // margin: {
  //   //   bottom: "10mm",
  //   //   left: "10mm",
  //   //   right: "10mm",
  //   //   top: "10mm",
  //   // },
  // });

  await browser.close();
  return screenshot;
}

module.exports = printCorrelationVisualizerImage;

// printCorrelationVisualizerImage();
