function health(req, res) {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}

function alwaysError(req, res) {
  res.status(500).json({
    success: false,
    error: "Internal server error (mock)",
  });
}

function randomResponse(req, res) {
  const rnd = Math.random();

  if (rnd < 0.33) {
    return res.status(200).json({ success: true, mode: "ok" });
  } else if (rnd < 0.66) {
    return res
      .status(400)
      .json({ success: false, error: "Random bad request" });
  } else {
    return res
      .status(500)
      .json({ success: false, error: "Random server error" });
  }
}

module.exports = {
  health,
  alwaysError,
  randomResponse,
};
