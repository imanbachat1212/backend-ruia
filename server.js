const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet"); // <-- added
const cors = require("cors");
const connectDB = require("./config/db.js");

const contactRoutes = require("./routes/contactRoute.js");
const commentRoutes = require("./routes/commentRoute.js");

dotenv.config();
const app = express();

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security Headers
app.use(helmet()); // adds nosniff, xss protection, etc.

// Optional: explicitly add X-Content-Type-Options (already done by helmet)
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

// CORS
const corsOptions = {
  origin: "http://127.0.0.1:5500", // adjust for production
  credentials: true,
};
app.use(cors(corsOptions));

// Body parser
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/contact", contactRoutes);
app.use("/comments", commentRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running..");
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
