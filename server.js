const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db.js");
const cors = require("cors");
// const userRoutes = require("./routes/userRoutes.js");
const contactRoutes = require("./routes/contactRoute.js");
const commentRoutes = require("./routes/commentRoute.js");
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const corsOptions = {
  origin: "https://www.ruiasolutions.com",
  credentials: true,
};

app.use(cors(corsOptions));
dotenv.config();
app.use(express.json());

connectDB();

// app.use("/user", userRoutes);
app.use("/contact", contactRoutes);
app.use("/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("API is running..");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
