// screenMiddleware.js
function screenMiddleware(req, res, next) {
  const { screen } = req.params;
  if (!screen) {
    return res.status(400).json({ error: "Screen parameter is required" });
  }
  req.screen = screen;
  next();
}
module.exports = screenMiddleware;
