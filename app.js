const express = require("express");
const puppeteer = require("pupeteer");

const app = express();
const port = 9421;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/print", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
