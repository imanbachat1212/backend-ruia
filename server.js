const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
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

// ✅ Helmet with Custom Configuration
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://www.googletagmanager.com",
          "https://cdnjs.cloudflare.com",
          "https://assets.calendly.com",
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://assets.calendly.com",
        ],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        frameSrc: ["https://calendly.com"],
        connectSrc: ["'self'", "https://api.calendly.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    frameguard: { action: "deny" }, // ✅ X-Frame-Options: DENY
    referrerPolicy: { policy: "strict-origin-when-cross-origin" }, // ✅ Referrer-Policy
    crossOriginEmbedderPolicy: false, // optional if using third-party iframes
    xContentTypeOptions: true, // ✅ X-Content-Type-Options: nosniff
  })
);

// CORS
const corsOptions = {
  origin: "https://farahsalhab.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

app.use(cors(corsOptions));

// Body parser
app.use(express.json());

// DB connection
connectDB();

// Routes
app.use("/contact", contactRoutes);
app.use("/comments", commentRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("API is running..");
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
