const crypto = require('crypto');

function generateJwt(userId) {
  const secretKey = process.env.JWT_SECRET || 'your-secret-key';
  const tokenData = {
    userId: userId,
    timestamp: Date.now(),
  };
  const token = crypto.createHmac('sha256', secretKey)
                      .update(JSON.stringify(tokenData))
                      .digest('hex');
  return token;
}

module.exports = generateJwt;
