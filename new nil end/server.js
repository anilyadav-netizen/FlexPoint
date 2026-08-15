require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dns = require("dns");
dns.setServers(['1.1.1.1','8.8.8.8'])

const authRoutes = require("./routes/authRoutes");
const planRoutes = require("./routes/planRoutes");
const programRoutes = require("./routes/programRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const blogRoutes = require("./routes/blogRoutes");


const app = express();

// ==========================
// Middleware
// ==========================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ==========================
// Routes
// ==========================

app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/blogs", blogRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

// ==========================
// MongoDB
// ==========================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });