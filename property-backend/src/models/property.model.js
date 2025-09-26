const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  bhk: { type: Number, required: true },
  type: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

PropertySchema.index({ title: "text", description: "text", location: "text" });

module.exports = mongoose.model("Property", PropertySchema);
