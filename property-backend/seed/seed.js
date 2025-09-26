// seed/seed.js
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Property = require("../src/models/property.model"); // adjust path

require("dotenv").config(); // if using .env for DB URL

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

async function seedProperties() {
  try {
    // Clear existing properties
    await Property.deleteMany();

    // Read JSON file
    const dataPath = path.join(__dirname, "properties.json");
    const propertiesData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    // Insert into MongoDB
    await Property.insertMany(propertiesData);
    console.log("Properties inserted successfully!");

    mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding properties:", err);
  }
}

seedProperties();
