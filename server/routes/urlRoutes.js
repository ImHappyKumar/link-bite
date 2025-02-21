const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const { nanoid } = require("nanoid");
const useragent = require("express-useragent");

const db = admin.firestore();
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// Middleware to parse user agent
router.use(useragent.express());

// Shorten a URL
router.post("/shorten", async (req, res) => {
  try {
    const { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ error: "URL is required" });

    const shortCode = nanoid(6);
    await db.collection("short_urls").doc(shortCode).set({
      long_url: longUrl,
      created_at: new Date().toISOString(),
      clicks: 0,
    });

    res.json({ shortUrl: `${BASE_URL}/${shortCode}` });
  } catch (error) {
    console.error("Error in /shorten:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Redirect to Long URL
router.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    const doc = await db.collection("short_urls").doc(shortCode).get();

    if (!doc.exists) return res.status(404).json({ error: "URL not found" });

    const data = doc.data();

    // Extract analytics data
    const userAgent = req.useragent;
    const referrer = req.get("Referer") || "direct";
    const country = req.get("cf-ipcountry") || "unknown"; // Cloudflare IP-based country detection
    const deviceType = userAgent.isMobile
      ? "mobile"
      : userAgent.isDesktop
      ? "desktop"
      : "other";

    // Update analytics in Firestore
    const analyticsRef = db.collection("url_stats").doc(shortCode);
    await analyticsRef.set(
      {
        clicks: admin.firestore.FieldValue.increment(1),
        geo_location: { [country]: admin.firestore.FieldValue.increment(1) },
        referrer: { [referrer]: admin.firestore.FieldValue.increment(1) },
        device_info: { [deviceType]: admin.firestore.FieldValue.increment(1) },
        timestamps: admin.firestore.FieldValue.arrayUnion(
          new Date().toISOString()
        ),
      },
      { merge: true }
    );

    // Update total clicks in `short_urls`
    await db
      .collection("short_urls")
      .doc(shortCode)
      .update({
        clicks: admin.firestore.FieldValue.increment(1),
      });

    res.redirect(data.long_url);
  } catch (error) {
    console.error("Error in /:shortCode:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
