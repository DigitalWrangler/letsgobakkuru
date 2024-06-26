const bcrypt = require("bcrypt");

async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
}

module.exports = hashPassword;
