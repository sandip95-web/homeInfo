const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const errorMiddleWare = require("./middleware/error");
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
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
app.use("/auth", authRoute);
app.use("/user", userRoute);

app.use(errorMiddleWare);

// Start the server
const PORT = process.env.PORT || 3000; // Default to port 3000 if PORT environment variable is not set
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
