// middleware/auth.middleware.js
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ success: false, error: "No token provided" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ success: false, error: "Invalid token format" });
  }

  const token = parts[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid or expired token" });
    }

    // zapisujemy payload z tokena do req.user
    req.user = decoded;
    next();
  });
}

// np. sprawdzenie roli
function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, error: "Forbidden – admin only" });
  }
  next();
}

module.exports = {
  authMiddleware,
  adminOnly,
};
