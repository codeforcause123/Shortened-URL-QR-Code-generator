const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrls");
const app = express();
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/urlshorter", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Url = mongoose.model("shortUrl", {
  full: { type: String },
  short: { type: String },
  clicks: { type: Number },
});
Url.deleteMany({}, function (err) {
  console.log("Database Cleared");
});
app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

app.get("/urls", async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.json({ shortUrls: shortUrls });
  });
app.post("/shortUrls", async (req, res) => {
  const urlsshort = await ShortUrl.create({ full: req.body.fullUrl });
  res.json({ shortUrl: urlsshort.short });
});
app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);
  shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.full);
});
app.listen(process.env.PORT || 5000);
