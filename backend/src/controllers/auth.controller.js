// controllers/auth.controller.js
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { MOCK_USER, MOCK_ADMIN } = require("../data/db");

function login(req, res) {
  const { email, password } = req.body;

  let user;

  if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
    user = MOCK_ADMIN;
  } else if (email === MOCK_USER.email && password === MOCK_USER.password) {
    user = MOCK_USER;
  } else {
    return res
      .status(401)
      .json({ success: false, error: "Invalid credentials" });
  }

  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

  res.status(200).json({
    success: true,
    token,
  });
}

module.exports = {
  login,
};
