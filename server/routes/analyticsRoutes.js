const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

const db = admin.firestore();

// Get analytics for a short URL
router.get("/:shortCode", async (req, res) => {
  const { shortCode } = req.params;
  const doc = await db.collection("url_stats").doc(shortCode).get();

  if (!doc.exists) return res.status(404).json({ error: "No analytics found" });

  res.json(doc.data());
});

module.exports = router;
