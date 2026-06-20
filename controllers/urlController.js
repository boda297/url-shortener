const { nanoid } = require("nanoid");
const Url = require("../models/Url");

exports.shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    return res.status(400).json({ message: "URL is required" });
  }
  try {
    const shortCode = nanoid(10);
    const url = new Url({ originalUrl, shortCode });
    await url.save();
    res.json(url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error shortening URL" });
  }
};

exports.redirectToLongUrl = async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const url = await Url.findOne({ shortCode: shortUrl });
    if (!url) {
      return res.status(404).send("URL not found");
    }
    let targetUrl = url.originalUrl;
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = "http://" + targetUrl;
    }
    res.redirect(targetUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
