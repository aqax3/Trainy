import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI as string);

// Middleware
app.use(cors());
app.use(express.json());

// Define your API routes here

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
