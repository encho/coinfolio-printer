const express = require("express");
const puppeteer = require("puppeteer");

const printFactsheetPDF = require("./printFactsheetPDF");
const printCorrelationVisualizerImage = require("./printCorrelationVisualizerImage");

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

// app.get("/analytics/correlation-visualizer.png", async (req, res) => {
app.get("/analytics/correlation-visualizer", async (req, res) => {
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

  const screenshotBuffer = await printCorrelationVisualizerImage(modelInputs);

  res.send(screenshotBuffer);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
