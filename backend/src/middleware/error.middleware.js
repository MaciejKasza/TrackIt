// middleware/error.middleware.js
function errorHandler(err, req, res, next) {
  console.error("Unexpected error:", err);

  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
}

module.exports = { errorHandler };
