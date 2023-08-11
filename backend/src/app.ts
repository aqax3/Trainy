import "dotenv/config";

import express from "express";
import ExpressMongoSanitize from "express-mongo-sanitize";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "./schemas/User";
import Exercise from "./schemas/Exercise";
import Workout from "./schemas/Workout";
import WorkoutCalendar from "./schemas/Workoutcalendar";
import Plan from "./schemas/Plan";
import authenticateToken from "./middleware/authenticateToken";
import authenticateAdminToken from "./middleware/authenticateAdminToken";
import {
  getWorkoutRecommendation,
  getUserWorkoutHistory,
} from "./services/recommendations";
import {
  getCompletedWorkouts,
  getExerciseTypeStats,
  getAverageWorkoutDuration,
  getLongestAndShortestWorkout,
  getMostCommonExercise,
  getWorkoutFrequency
} from "./services/statistics";

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error: ", err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(ExpressMongoSanitize());

// Define your API routes here

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//REGISTER USER
app.post("/register-user", async (req, res) => {
  const { username, password, adminCode } = req.body;

  if (!username || !password) {
    return res.status(400).send("Missing user data");
  }

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).send("Username already taken!");
  }

  let isAdmin = false;

  if (adminCode) {
    if (adminCode === process.env.ADMIN_CODE) {
      isAdmin = true;
    } else {
      return res.status(403).send("Invalid admin code.");
    }
  }

  const user = new User({ username, password, isAdmin });

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
      { userId: user._id, username: user.username, isAdmin: user.isAdmin },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.send({ user, userToken });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// user height
app.put("/update-height", authenticateToken, async (req, res) => {
  const { height } = req.body;
  const { userId } = req.user;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).send("User not found");
    }

    if (height !== undefined) {
      user.height = height;
    }

    await user.save();

    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// user weight
app.put("/update-weight", authenticateToken, async (req, res) => {
  const { weight } = req.body;
  const { userId } = req.user;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).send("User not found");
    }

    if (weight !== undefined) {
      user.weight = weight;
    }

    await user.save();

    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.post("/exercises", authenticateAdminToken, async (req, res) => {
  const { name, description, muscleGroup, videoURL, imageURL, weight } = req.body;

  const exercise = new Exercise({ name, description, muscleGroup, videoURL, imageURL, weight });

  try {
    await exercise.save();
    res.send(exercise);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/exercises", authenticateToken, async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.send(exercises);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/exercises/:name", authenticateToken, async (req, res) => {
  const exerciseName = req.params.name;

  try {
      const exercise = await Exercise.findOne({ name: exerciseName });
      
      if (!exercise) {
          return res.status(404).send("Exercise not found");
      }

      res.send(exercise);
  } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
  }
});

app.get('/exercise', async (req, res) => {
  const { name } = req.query;
  try {
      // Use a regex search to find exercises containing the letters in the name
      const exercises = await Exercise.find({ name: new RegExp(name as string, 'i') });
      res.json(exercises);
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch exercises." });
  }
});


app.delete("/exercises/:id", authenticateToken, async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);

    if (!exercise) {
      return res.status(404).send('Exercise not found');
    }

    res.send(exercise);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


app.get("/exercises/muscle-group/:muscleGroup", authenticateToken, async (req, res) => {
  try {
    const { muscleGroup } = req.params;
    const exercises = await Exercise.find({ muscleGroup });
    res.send(exercises);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


app.put("/exercises/weight/:id", authenticateToken, async (req, res) => {
  const { weight } = req.body;

  try {

    const exercise = await Exercise.findByIdAndUpdate(req.params.id, { weight }, { new: true });

    if (!exercise) {
      return res.status(404).send('Exercise not found');
    }

    res.send(exercise);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


app.post("/workouts", authenticateToken, async (req, res) => {
  const { name, description, duration, difficulty, exercises } = req.body;
  const { userId } = req.user;

  const workout = new Workout({
    userId,
    name,
    description,
    duration,
    difficulty,
    exercises,
  });

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
    const workouts = await Workout.find({ userId }).populate('exercises.exerciseId');
    res.send(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//workoutcalendar

//shrani workout
app.post("/workoutcalendar", authenticateToken, async (req, res) => {
  try {
    const workoutCalendar = new WorkoutCalendar({
      ...req.body,
      user: req.user.userId,
    });
    await workoutCalendar.save();
    res.status(201).send(workoutCalendar);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

//prikazi workout
app.get("/workoutcalendar", authenticateToken, async (req, res) => {
  try {
    const workouts = await WorkoutCalendar.find({ user: req.user.userId });
    res.send(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//uredi workout
app.patch("/workoutcalendar/:id", authenticateToken, async (req, res) => {
  try {
    const workout = await WorkoutCalendar.findById(req.params.id);
    if (!workout) return res.status(404).send();

    if (workout.user.toString() !== req.user.userId) {
      return res.status(401).send("Unauthorized");
    }

    Object.assign(workout, req.body);
    await workout.save();
    res.send(workout);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

// update completed boolean on workoutcalendar
app.patch('/workoutcalendar/:id/completed', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updatedWorkout = await WorkoutCalendar.findByIdAndUpdate(id, { completed }, { new: true });

    if (!updatedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    return res.status(200).json(updatedWorkout);
  } catch (error) {
    console.error("Error updating workout completion:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//izbrisi workout
app.delete("/workoutcalendar/:id", authenticateToken, async (req, res) => {
  try {
    const workout = await WorkoutCalendar.findById(req.params.id); 
    
    if (!workout) return res.status(404).send("Workout not found");

    if (workout.user.toString() !== req.user.userId) {
      return res.status(401).send("Unauthorized");
    }

    const deletedWorkout = await WorkoutCalendar.findByIdAndDelete(req.params.id);

    res.send(deletedWorkout);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//Plans
app.post("/plans", authenticateToken, async (req, res) => {
  try {
    const plan = new Plan({
      ...req.body,
      user: req.user.userId,
    });
    await plan.save();
    res.status(201).send(plan);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/plans", authenticateToken, async (req, res) => {
  try {
    const plans = await Plan.find({ user: req.user.userId }).populate("workouts");
    res.send(plans);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Recommendations

app.get("/recommendations", authenticateToken, async (req, res) => {
  try {
    const recommendation = await getWorkoutRecommendation(req.user.userId);
    res.send(recommendation);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.get(
  "/workoutHistory/:userId/:startDate",
  authenticateToken,
  async (req, res) => {
    try {
      const startDate = new Date(req.params.startDate);
      const workouts = await getUserWorkoutHistory(req.user.userId, startDate);
      res.json(workouts);
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

//Statsitcs

app.get("/completedWorkouts/", authenticateToken, async (req, res) => {
  try {
    const workouts = await getCompletedWorkouts(req.user.userId);
    res.json({ completedWorkouts: workouts });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.get("/exerciseTypeStats/", authenticateToken, async (req, res) => {
  try {
    const stats = await getExerciseTypeStats(req.user.userId);
    res.json(stats);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.get("/averageWorkoutDuration", authenticateToken, async (req, res) => {
  try {
    const averageDuration = await getAverageWorkoutDuration(req.user.userId);
    res.json({ averageDuration });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.get("/workoutLengthStats", authenticateToken, async (req, res) => {
  try {
    const { longest, shortest } = await getLongestAndShortestWorkout(req.user.userId);
    res.json({ longest, shortest });
  } catch (err) {
    res.status(500).send("Server error");
  }
});


app.get("/mostCommonExercise", authenticateToken, async (req, res) => {
  try {
    const mostCommonExercise = await getMostCommonExercise(req.user.userId);
    res.json({ mostCommonExercise });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.get("/workoutFrequency/:period", authenticateToken, async (req, res) => {
  const period = req.params.period as "week" | "month";
  try {
    const frequency = await getWorkoutFrequency(req.user.userId, period);
    res.json({ frequency });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
