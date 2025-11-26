// routes/users.routes.js
const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getProfile,
  getAdminStats,
} = require("../controllers/users.controller");

const { authMiddleware, adminOnly } = require("../middleware/auth.middleware");

// Uwaga: bardziej specyficzne ścieżki (np. /admin) dajemy przed /:id

// /api/users/me/profile
router.get("/me/profile", authMiddleware, getProfile);

// /api/users/admin/stats
router.get("/admin/stats", authMiddleware, adminOnly, getAdminStats);

// /api/users/
router.get("/", authMiddleware, getUsers);
router.post("/", authMiddleware, createUser);

// /api/users/:id
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
