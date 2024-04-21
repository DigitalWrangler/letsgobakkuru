  const express = require("express");
  const router = express.Router();

  router.post("/record-visit", async (req, res) => {
    try {
      const { cookieId, ip, userAgent } = req.body;
      // Record visit logic
      res.status(200).send("Visit recorded successfully");
    } catch (error) {
      console.error("Error recording visit:", error);
      res.status(500).send("Error processing visit data");
    }
  });
  module.exports = router;
