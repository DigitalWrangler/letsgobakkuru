const Collection = require("./home/psyduck1337/Documents/gitNstuff/portfolio/portfolio-backend/src/models/Collection.js");

const newCollection = new Collection({
  name: "My Collection",
  description: "This is a test collection",
  createdBy: "userId123", // Replace with the ObjectId of the user who created the collection
});

newCollection
  .save()
  .then((collection) => {
    console.log("Collection saved successfully:", collection);
  })
  .catch((error) => {
    console.error("Error saving collection:", error);
  });
