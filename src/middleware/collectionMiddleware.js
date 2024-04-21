// collectionMiddleware.js
function collectionMiddleware(req, res, next) {
  const { collectionName } = req.params;
  if (!collectionName) {
    return res.status(400).json({ error: "Collection name is required" });
  }
  req.collectionName = collectionName;
  next();
}
module.exports = collectionMiddleware;
