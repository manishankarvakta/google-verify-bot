const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const puppeteer = require("puppeteer");
const asyncHandler = require("express-async-handler");

const urls = {
  url1: "https://accounts.google.com/signin/v2/identifier?service=accountsettings&passive=1209600&osid=1&continue=https%3A%2F%2Fmyaccount.google.com%2Fsigninoptions%2Frescuephone%3Futm_source%3Dgoogle-account%26utm_medium%3Dweb%26hl%3Den&followup=https%3A%2F%2Fmyaccount.google.com%2Fsigninoptions%2Frescuephone%3Futm_source%3Dgoogle-account%26utm_medium%3Dweb%26hl%3Den&hl=en&emr=1&mrp=security&rart=ANgoxcdkWr1IrmRRXzDCO43uEwvDy2dTUwlCxjmm7CEOcLS6o6XWZ-1CLhGpYO1mB90wduWBtiF7zo8iy5hL5JtcSUMBVVFJQw&flowName=GlifWebSignIn&flowEntry=ServiceLogin",
  url2: "https://myaccount.google.com/signinoptions/two-step-verification/enroll?hl=en&rapt=",
  url3: "https://myaccount.google.com/two-step-verification/backup-codes?rapt=",
  url4: "https://myaccount.google.com/apppasswords?rapt=",
};

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

// FUNCTIONS
// start
const startVerification = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(urls.url1).then(console.log(true));
};

app.get(
  "/",
  asyncHandler((req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(`Bot Api!`);
  })
);

app.get(
  "/api/start",
  asyncHandler(async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    //   res.send(`Bot Api!`);
    try {
      const start = await startVerification();
      if (start) {
        res.send({ status: true });
        console.log();
      }
    } catch (err) {
      console.log(err);
    }
  })
);

app.listen(5000, () =>
  console.log("Express server is running on localhost:5000")
);
