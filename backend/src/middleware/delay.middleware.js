// middleware/delay.middleware.js
function delayMiddleware(req, res, next) {
  const delayMs = 300;
  setTimeout(next, delayMs);
}

module.exports = { delayMiddleware };
