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

// ✅ Proper Helmet Setup – DO NOT overwrite it with manual headers later
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       useDefaults: true,
//       directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: [
//           "'self'",
//           "'unsafe-inline'",
//           "https://www.googletagmanager.com",
//           "https://cdnjs.cloudflare.com",
//           "https://assets.calendly.com",
//         ],
//         styleSrc: [
//           "'self'",
//           "'unsafe-inline'",
//           "https://fonts.googleapis.com",
//           "https://assets.calendly.com",
//         ],
//         fontSrc: ["'self'", "https://fonts.gstatic.com"],
//         imgSrc: ["'self'", "data:", "https:"],
//         frameSrc: ["https://calendly.com"],
//         connectSrc: ["'self'", "https://api.calendly.com"],
//         objectSrc: ["'none'"],
//       },
//     },
//     frameguard: { action: "deny" },
//     referrerPolicy: { policy: "strict-origin-when-cross-origin" },
//     crossOriginEmbedderPolicy: false,
//   })
// );

// ✅ DO NOT manually set headers again (Helmet already does this!)

// ✅ CORS – must be placed after helmet but before routes
const corsOptions = {
  origin: "https://farahsalhab.com", // update for prod
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

// JSON body parser
app.use(express.json());

// DB connection
connectDB();

// Routes
app.use("/contact", contactRoutes);
app.use("/comments", commentRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("API is running..");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
