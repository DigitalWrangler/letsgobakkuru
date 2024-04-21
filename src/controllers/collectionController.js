// handlers/collectionHandler.js
const mongoose = require("mongoose");
const collectionLogger = require("../loggers/collectionLogger");

// Handler for creating a new collection
async function createCollectionHandler(req, res) {
  const { collectionName, initialData } = req.body;

  if (!collectionName) {
    return res.status(400).json({ error: "Collection name is required" });
  }

  try {
    // Define a schema with mixed type for dynamic fields
    const schemaDefinition = {};
    Object.keys(initialData).forEach((key) => {
      schemaDefinition[key] = mongoose.Schema.Types.Mixed;
    });
    const DynamicSchema = mongoose.Schema(schemaDefinition);

    // Create a model based on the dynamic schema
    const DynamicModel = mongoose.model(
      collectionName,
      DynamicSchema,
      collectionName,
    );

    // Create the collection in MongoDB
    await mongoose.connection.db.createCollection(collectionName);

    // Log successful collection creation
    collectionLogger.info(
      `Collection '${collectionName}' created successfully`,
    );

    // Insert initial data into the collection
    const doc = await DynamicModel.create(initialData);

    // Respond with success message
    res.json({
      message: `Collection '${collectionName}' created successfully`,
      id: doc._id,
    });
  } catch (error) {
    // Log error while creating collection
    collectionLogger.error(`Error creating the collection: ${error}`);

    console.error("Error creating the collection:", error);
    res.status(500).json({ error: "Failed to create collection" });
  }
}

// Handler for retrieving a collection
async function getCollectionHandler(req, res) {
  const { collectionName } = req.params;

  if (!collectionName) {
    return res.status(400).json({ error: "Collection name is required" });
  }

  try {
    // Fetch the collection from MongoDB
    const collection = await mongoose.connection.db
      .collection(collectionName)
      .find()
      .toArray();

    // Respond with the collection data
    res.json(collection);
  } catch (error) {
    // Log error while fetching collection
    collectionLogger.error(`Error fetching the collection: ${error}`);

    console.error("Error fetching the collection:", error);
    res.status(500).json({ error: "Failed to fetch collection" });
  }
}

module.exports = { createCollectionHandler, getCollectionHandler };
