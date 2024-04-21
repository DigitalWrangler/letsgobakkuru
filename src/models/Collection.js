const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,  // Keep as ObjectId if referencing User model
    ref: "User",
    required: true,
    validate: {
      validator: function(v) {
        return /^[0-9a-fA-F]{24}$/.test(v);  // Validates the string as a valid ObjectId
      },
      message: props => `${props.value} is not a valid user ID!`
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
