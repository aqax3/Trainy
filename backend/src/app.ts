import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "./schemas/User";
import Exercise from "./schemas/Exercise";
import Workout from "./schemas/Workout";
import authenticateToken from "./middleware/authenticateToken";

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

//REGISTER USER
app.post("/register-user", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("Missing user data");
  }

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).send("Username already taken!");
  }

  const user = new User({ username, email, password });

  try {
    await user.save();
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//LOGIN USER
app.post("/login-user", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Missing user data");
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).send("Invalid password");
    }

    console.log(process.env.JWT_SECRET);

    const userToken = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.send({ user, userToken });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.post("/exercises", authenticateToken, async (req, res) => {
  const { name, description, type } = req.body;

  const exercise = new Exercise({ name, description, type });

  try {
    await exercise.save();
    res.send(exercise);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/exercises", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.send(exercises);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.post("/workouts", authenticateToken, async (req, res) => {
  const { date, exerciseIds } = req.body;
  const { userId } = req.user;

  const workout = new Workout({ userId, date, exercises: exerciseIds });

  try {
    await workout.save();
    res.send(workout);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/workouts", authenticateToken, async (req, res) => {
  const { userId } = req.user;

  try {
    const workouts = await Workout.find({ userId }).populate('exercises');
    res.send(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
