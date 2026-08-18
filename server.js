const dns = require("dns");

// Use reliable DNS servers for MongoDB Atlas
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());

// Serve frontend files from public folder
app.use(express.static("public"));

// ===============================
// API ROUTES
// ===============================

// Authentication routes
app.use("/api/auth", require("./routes/authRoutes"));

// Property CRUD routes
app.use("/api/properties", require("./routes/propertyRoutes"));

// ===============================
// API HOME
// ===============================

// If no frontend index.html is found,
// this route will show the API message.
app.get("/api", (req, res) => {
  res.json({
    message: "Real Estate Agency API is running 🏠",
  });
});

// ===============================
// MONGODB + SERVER
// ===============================

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);
  });
