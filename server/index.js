const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// MongoDB Connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Routes
// Define your routes here

// Start the server
const PORT = process.env.PORT || 3000; // Default to port 3000 if PORT environment variable is not set
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
