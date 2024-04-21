// 1. Import required modules
const mongoose = require("mongoose");
const faker = require("faker");
const User = require("./models/User");
const Collection = require("./models/Collection");

// 2. Function to connect to MongoDB
async function connectDB() {
  try {
    const mongoConnectionString =
      "mongodb://localhost:27017/your_database_name";
    await mongoose.connect(mongoConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// 3. Function to populate users
async function populateUser() {
  try {
    // 3.1 Clear existing users
    await User.deleteMany();

    // 3.2 Populate new users
    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = new User({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
      await user.save();
      users.push(user);
    }
    console.log("Users populated:", users);
  } catch (error) {
    console.error("Error populating users:", error);
  }
}

// 4. Function to populate collections
async function populateCollections() {
  try {
    // 4.1 Clear existing collections
    await Collection.deleteMany();

    // 4.2 Populate new collections
    const collections = [];
    for (let i = 0; i < 5; i++) {
      const collection = new Collection({
        name: faker.random.words(3),
        description: faker.lorem.sentence(),
        createdBy: faker.random.arrayElement(users)._id, // Assuming users array is available
      });
      await collection.save();
      collections.push(collection);
    }
    console.log("Collections populated:", collections);
  } catch (error) {
    console.error("Error populating collections:", error);
  }
}

// 5. Main function to run the script
async function main() {
  await connectDB();
  await populateUsers();
  await populateCollections();
  mongoose.disconnect();
}

// 6. Call the main function to execute the script
main();

// 7. Footer
console.log("\n----------------------");
console.log("Script execution complete.");

// 8. Description
console.log("\nDescription:");
console.log(
  "This script connects to a MongoDB database, populates it with random user and collection data using Faker.js, and logs the results.",
);
