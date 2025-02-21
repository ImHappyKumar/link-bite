const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
require("dotenv").config();

// Initialize Firebase
const serviceAccount = require("./firebaseConfig.json");
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const app = express();
app.use(express.json());
app.use(cors());

// Import Routes
const urlRoutes = require("./routes/urlRoutes");

// Use Routes
app.use("/", urlRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
