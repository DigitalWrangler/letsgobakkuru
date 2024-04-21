const express = require('express');
const generateJwt = require('../middleware/jwtMiddleware');

const router = express.Router();

router.use(express.json());

// Middleware to handle successful login
router.post('/login', (req, res, next) => {
  // Perform authentication and obtain userId
  const userId = 'exampleUserId'; // Replace with actual userId

  // Generate JWT token
  const jwtToken = generateJwt(userId);

  // Send JWT token in the response
  res.json({ token: jwtToken });
});

module.exports = router;
