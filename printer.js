const puppeteer = require("puppeteer");

console.log("creating factsheet pdf...");

async function printPDF() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const strategyId = "GOLD_CRYPTO_60_40";
  const filePath = `./FACTSHEET__${strategyId}.pdf`;

  await page.goto(
    `http://localhost:3000/bapp/strategies/${strategyId}/factsheet`,
    {
      waitUntil: "networkidle2",
    }
  );

  //   await page.emulateMediaType("print");
  //   await page.evaluate(() => matchMedia("print").matches);
  //   await page.evaluate();
  //   TODO introduce eventually if we need to wait js renders
  await page.waitForTimeout(1000);
  await page.waitForSelector("#SmallPerformanceChart");

  const pdf = await page.pdf({
    printBackground: true,
    path: filePath,
    preferCSSPageSize: true,
    // format: "A4",
    // margin: {
    //   bottom: "10mm",
    //   left: "10mm",
    //   right: "10mm",
    //   top: "10mm",
    // },
  });

  await browser.close();
  return pdf;
}

printPDF();
