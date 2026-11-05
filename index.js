const express = require("express");
const app = express();
app.use(express.json());
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "mytoken123";

app.get("/", (req, res) => res.send("Bot chal raha hai"));

app.get("/webhook", (req, res) => {
  if (req.query["hub.mode"] === "subscribe" &&
      req.query["hub.verify_token"] === VERIFY_TOKEN) {
    return res.status(200).send(req.query["hub.challenge"]);
  }
  res.sendStatus(403);
});

app.post("/webhook", (req, res) => {
  console.log(JSON.stringify(req.body));
  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000);
