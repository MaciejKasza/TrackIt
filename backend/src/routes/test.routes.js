// routes/system.routes.js
const express = require("express");
const router = express.Router();

const {
  health,
  alwaysError,
  randomResponse,
} = require("../controllers/test.controller");

// /api/health
router.get("/health", health);

// /api/error
router.get("/error", alwaysError);

// /api/random
router.get("/random", randomResponse);

module.exports = router;
