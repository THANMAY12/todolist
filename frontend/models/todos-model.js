const mongoose = require("mongoose");

const schema = mongoose.Schema;

const todoSchema = new schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {   
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Todo", todoSchema);