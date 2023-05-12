import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import User from "./User";

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error: ", err));

// Middleware
app.use(cors());
app.use(express.json());

// Define your API routes here

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/add-user", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send("Missing name");
  }

  const user = new User({ name });
  
  try {
    await user.save();
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
})

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
