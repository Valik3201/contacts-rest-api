const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const connectDB = require("./config/database");

connectDB();

const app = express();

app.use(express.json());

const contactsRouter = require("./routes/api/contactRoutes");
const authRoutes = require("./routes/api/authRoutes");
const authenticateToken = require("./middleware/authenticateToken");

app.use("/api/contacts", authenticateToken, contactsRouter);
app.use("/api/auth", authRoutes);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());

app.use((req, res) => {
  res.status(404).json({ message: "404 Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
