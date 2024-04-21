// collectionHandler.js
const mongoose = require("mongoose");
const collectionLogger = require("../loggers/collectionLogger");

// Function to retrieve collections information
async function retrieveCollectionsInfo() {
  try {
    // Fetch all collections from the MongoDB database
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    // Count the number of collections
    const collectionCount = collections.length;

    // Log the collection count and list the collection names in the terminal
    console.log(`Number of collections: ${collectionCount}`);
    console.log("List of collections:");
    collections.forEach((collection) => console.log(collection.name));

    // Return the collection count and list of collection names
    return {
      collections: collections.map((collection) => collection.name),
      count: collectionCount,
    };
  } catch (error) {
    // Log error while retrieving collections
    collectionLogger.error(`Error retrieving collections: ${error}`);
    throw new Error("Failed to retrieve collections");
  }
}

// Function to create a new collection
async function createCollection(collectionName) {
  try {
    // Create a new collection in the MongoDB database
    await mongoose.connection.createCollection(collectionName);
    console.log(`Collection '${collectionName}' created successfully`);
  } catch (error) {
    // Log error while creating collection
    collectionLogger.error(
      `Error creating collection '${collectionName}': ${error}`,
    );
    throw new Error(`Failed to create collection '${collectionName}'`);
  }
}

module.exports = { retrieveCollectionsInfo, createCollection };
