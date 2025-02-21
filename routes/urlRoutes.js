const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const { nanoid } = require("nanoid");

const db = admin.firestore();
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// Shorten a URL
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) return res.status(400).json({ error: "URL is required" });

  const shortCode = nanoid(6);
  await db.collection("short_urls").doc(shortCode).set({
    long_url: longUrl,
    created_at: new Date().toISOString(),
    clicks: 0,
  });

  res.json({ shortUrl: `${BASE_URL}/${shortCode}` });
});

// Redirect to Long URL
router.get("/:shortCode", async (req, res) => {
  const { shortCode } = req.params;
  const doc = await db.collection("short_urls").doc(shortCode).get();

  if (!doc.exists) return res.status(404).json({ error: "URL not found" });

  const data = doc.data();
  await db
    .collection("short_urls")
    .doc(shortCode)
    .update({
      clicks: admin.firestore.FieldValue.increment(1),
    });

  res.redirect(data.long_url);
});

module.exports = router;
