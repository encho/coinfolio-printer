const express = require("express");
const puppeteer = require("puppeteer");

const printFactsheetPDF = require("./printFactsheetPDF");
const correlationVisualizer = require("./correlationVisualizer");
const performanceCompare = require("./performanceCompare");

const app = express();
const port = 9421;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/print", (req, res) => {
  res.send("Hello World!");
});

app.get("/factsheet", async (req, res) => {
  const pdfBuffer = await printFactsheetPDF();
  res.setHeader("Content-disposition", "attachment; filename=heeh.pdf");
  res.send(pdfBuffer);
});

app.get("/analytics/correlation-visualizer/:type", async (req, res) => {
  const type = req.params.type;
  console.log("endpoint - print correlation visualizer with type: " + type);
  const firstAsset = req.query.firstAsset;
  const secondAsset = req.query.secondAsset;
  const endDate = new Date(req.query.endDate);
  const timePeriod = req.query.timePeriod;

  const modelInputs = {
    firstAsset,
    secondAsset,
    endDate,
    timePeriod,
  };

  const printer =
    type === "og-image"
      ? correlationVisualizer.printOgImage
      : correlationVisualizer.printChart;

  const screenshotBuffer = await printer(modelInputs);

  res.send(screenshotBuffer);
});

app.get("/nerdy/performance-compare/:type", async (req, res) => {
  const type = req.params.type;
  console.log(
    "endpoint - print performance compare visualizer with type: " + type
  );
  const firstAsset = req.query.firstAsset;
  const secondAsset = req.query.secondAsset;
  const endDate = new Date(req.query.endDate);
  const timePeriod = req.query.timePeriod;

  const modelInputs = {
    firstAsset,
    secondAsset,
    endDate,
    timePeriod,
  };

  const printer =
    type === "og-image"
      ? performanceCompare.printOgImage
      : performanceCompare.printChart;

  const screenshotBuffer = await printer(modelInputs);

  res.send(screenshotBuffer);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
