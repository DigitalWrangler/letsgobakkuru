const Admin = require("../models/UserAdmin"); // Ensure this path is correct

async function findAdmin(query) {
  try {
    // You can search by username or email by passing a suitable query object
    const admin = await Admin.findOne(query);
    if (admin) {
      console.log("Admin found:", admin);
      return admin;
    } else {
      console.log("No admin found with given criteria");
      return null;
    }
  } catch (error) {
    console.error("Error searching for admin:", error);
    throw error; // Or handle it in another way depending on your application's needs
  }
}

// Example usage:
// To find an admin by username
findAdmin({ username: "adminUser" });

// To find an admin by email
findAdmin({ email: "admin@example.com" });
