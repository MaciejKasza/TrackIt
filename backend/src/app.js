// app.js
const express = require("express");
const cors = require("cors");

const { delayMiddleware } = require("./middleware/delay.middleware");
const { errorHandler } = require("./middleware/error.middleware");

// Routes
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");
const testRoutes = require("./routes/test.routes");

const app = express();

// Middleware globalne
app.use(cors());
app.use(express.json());
app.use(delayMiddleware); // symulacja opóźnienia

// Główne routery
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/test", testRoutes); // np. /health, /error, /random

// Middleware błędów (na końcu)
app.use(errorHandler);

module.exports = app;
