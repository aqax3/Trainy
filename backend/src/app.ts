import "dotenv/config";

import express from "express";
import ExpressMongoSanitize from "express-mongo-sanitize";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
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
  getWorkoutFrequency,
  getAverageSetsAndReps,
  getWorkoutStreak,
  getExerciseFrequency,
  getTotalWorkoutsByDifficulty,
  mostCommonMuscleGroup,
  mostRecentCompletedWorkouts,
  mostUsedExercise,
  totalWeightLifted,
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

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

//REGISTER USER
app.post("/register-user", async (req: Request, res: Response) => {
  const { username, password, adminCode } = req.body;

  if (!username || !password) {
    return res.status(400).send("Missing registration data! Try again.");
  }

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).send("This username is already taken!");
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
app.post("/login-user", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Missing user data");
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send("Invalid username or password!");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", passwordMatch);

    if (!passwordMatch) {
      return res.status(400).send("Invalid username or password!");
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

app.patch(
  "/user-update",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { userId } = req.user;
    const { username, oldPassword, password, height, weight } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.status(400).send("This username is already taken!");
      }

      if (oldPassword && password) {
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
          return res.status(400).send({ message: "Old password is incorrect" });
        }

        user.password = password;
        await user.save();

        /*
      console.log("Old Password:", oldPassword);
      console.log("User Hashed Password:", user.password);
      console.log("New Password:", password);
      console.log("Hashed New Password:", hashedPassword);
      */
      }

      // Update the fields if provided
      if (username) {
        user.username = username;
      }
      if (typeof height !== "undefined") {
        // Check for undefined because height can be 0
        user.height = height;
      }
      if (typeof weight !== "undefined") {
        // Check for undefined because weight can be 0
        user.weight = weight;
      }

      await user.save();

      res.status(200).send({ message: "User updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

app.get(
  "/user-info",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { userId } = req.user;

    try {
      const userInfo = await User.findById(userId, "-password");

      if (!userInfo) {
        return res.status(404).send({ message: "User not found" });
      }

      res.status(200).send(userInfo);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

// user height
app.put(
  "/update-height",
  authenticateToken,
  async (req: Request, res: Response) => {
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
  }
);

// user weight
app.put(
  "/update-weight",
  authenticateToken,
  async (req: Request, res: Response) => {
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
  }
);

app.post(
  "/exercises",
  authenticateAdminToken,
  async (req: Request, res: Response) => {
    const { name, description, muscleGroup, videoURL, imageURL, weight } =
      req.body;

    const exercise = new Exercise({
      name,
      description,
      muscleGroup,
      videoURL,
      imageURL,
      weight,
    });

    try {
      await exercise.save();
      res.send(exercise);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

app.get(
  "/exercises",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const exercises = await Exercise.find();
      res.send(exercises);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

app.get(
  "/exercises/:name",
  authenticateToken,
  async (req: Request, res: Response) => {
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
  }
);

app.get("/exercise", async (req: Request, res: Response) => {
  const { name } = req.query;
  try {
    // Use a regex search to find exercises containing the letters in the name
    const exercises = await Exercise.find({
      name: new RegExp(name as string, "i"),
    });
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch exercises." });
  }
});

app.put(
  "/exercises/:id",
  authenticateAdminToken,
  async (req: Request, res: Response) => {
    const exerciseId = req.params.id;

    // Extract the fields from the request body
    const { name, description, muscleGroup, videoURL, imageURL, weight } =
      req.body;

    try {
      // Find the exercise by its ID and update it
      const exercise = await Exercise.findByIdAndUpdate(
        exerciseId,
        {
          // Update only fields that are provided
          ...(name && { name }),
          ...(description && { description }),
          ...(muscleGroup && { muscleGroup }),
          ...(videoURL && { videoURL }),
          ...(imageURL && { imageURL }),
          ...(typeof weight !== "undefined" && { weight }), // Using typeof check because weight can be 0
        },
        { new: true } // This option ensures that the updated document is returned
      );

      // If the exercise is not found, return a 404 error
      if (!exercise) {
        return res.status(404).send("Exercise not found");
      }

      // Send the updated exercise details as the response
      res.send(exercise);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

app.get(
  "/exercises-id/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const exercise = await Exercise.findById(req.params.id);
      console.log(exercise);

      if (!exercise) {
        return res.status(404).send("Exercise not found");
      }

      res.send(exercise);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

app.delete(
  "/exercises/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const exercise = await Exercise.findByIdAndDelete(req.params.id);

      if (!exercise) {
        return res.status(404).send("Exercise not found");
      }

      res.send(exercise);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

app.get(
  "/exercises/muscle-group/:muscleGroup",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const { muscleGroup } = req.params;
      const exercises = await Exercise.find({ muscleGroup });
      res.send(exercises);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

app.put(
  "/exercises/weight/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { weight } = req.body;

    try {
      const exercise = await Exercise.findByIdAndUpdate(
        req.params.id,
        { weight },
        { new: true }
      );

      if (!exercise) {
        return res.status(404).send("Exercise not found");
      }

      res.send(exercise);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

app.get(
  "/exercises-latest",
  authenticateToken,
  async (req: Request, res: Response) => {
    console.log("Accessing /exercises/latest endpoint");
    try {
      const latestExercises = await Exercise.find().sort({ _id: -1 }).limit(5);
      console.log(latestExercises);
      res.send(latestExercises);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

app.post(
  "/workouts",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { name, description, duration, difficulty, exercises } = req.body;
    const { userId } = req.user;

    let user;
    try {
      user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send("Server error");
    }

    //checks if the user that's creating the workout is an admin account
    const createdByAdmin = user.isAdmin;

    console.log("Received exercises:", exercises);

    const workout = new Workout({
      userId,
      name,
      description,
      duration,
      difficulty,
      exercises,
      createdByAdmin,
    });

    try {
      await workout.save();
      res.send(workout);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

app.get("/workouts", authenticateToken, async (req: Request, res: Response) => {
  const { userId } = req.user;

  try {
    const workouts = await Workout.find({ userId }).populate(
      "exercises.exerciseId"
    );
    res.send(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get(
  "/workouts/:workoutId",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { workoutId } = req.params;
    const { userId } = req.user;

    try {
      // Fetch the workout just based on its ID.
      const workout = await Workout.findById(workoutId);

      if (!workout) {
        return res.status(404).send("Workout not found");
      }

      // Check if the workout belongs to the user or is a community workout.
      if (
        workout.userId.toString() !== userId.toString() &&
        !workout.createdByAdmin
      ) {
        return res.status(403).send("Not authorized to access this workout");
      }

      res.send(workout);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

app.put(
  "/workouts/:workoutId",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { workoutId } = req.params;
    const { name, description, duration, exercises } = req.body;

    try {
      const workout = await Workout.findById(workoutId);

      if (!workout) {
        return res.status(404).send("Workout not found");
      }

      // Ensure the user updating the workout is the owner
      if (workout.userId.toString() !== req.user.userId) {
        return res.status(403).send("User not authorized");
      }

      workout.name = name;
      workout.description = description;
      workout.duration = duration;
      workout.exercises = exercises;

      await workout.save();

      res.send(workout);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

app.delete(
  "/workouts/:workoutId",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { workoutId } = req.params;

    try {
      const workout = await Workout.findById(workoutId);

      if (!workout) {
        return res.status(404).send("Workout not found");
      }

      // Ensure the user deleting the workout is the owner
      if (workout.userId.toString() !== req.user.userId) {
        return res.status(403).send("User not authorized");
      }

      await workout.deleteOne();

      res.send({ message: "Workout deleted successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

// admin dodani workouti
app.get(
  "/adminWorkouts",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      let conditions: { createdByAdmin: boolean; difficulty?: string } = { createdByAdmin: true };

      // Check if difficulty is provided in the query parameters
      if (req.query.difficulty && typeof req.query.difficulty === 'string') {
        conditions.difficulty = req.query.difficulty;
      }

      const adminWorkouts = await Workout.find(conditions);
      res.json(adminWorkouts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

//workoutcalendar

//shrani workout
app.post(
  "/workoutcalendar",
  authenticateToken,
  async (req: Request, res: Response) => {
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
  }
);

//prikazi workout
app.get(
  "/workoutcalendar",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const workouts = await WorkoutCalendar.find({ user: req.user.userId })
        .populate("workout", "name")
        .exec();
      res.send(workouts);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
);

app.get(
  "/workoutcalendar/today",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // set the time to the start of the day

      const workoutForToday = await WorkoutCalendar.findOne({
        user: req.user.userId,
        date: today,
      }).populate("workout"); // assuming the workout field in WorkoutCalendar references the Workout schema

      if (!workoutForToday) {
        return res.status(404).send("No workout planned for today");
      }

      res.send(workoutForToday);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
);

//uredi workout
app.patch(
  "/workoutcalendar/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
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
  }
);

// update completed boolean on workoutcalendar
app.patch(
  "/workoutcalendar/:id/completed",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { completed } = req.body;

    try {
      const updatedWorkout = await WorkoutCalendar.findByIdAndUpdate(
        id,
        { completed },
        { new: true }
      );

      if (!updatedWorkout) {
        return res.status(404).json({ message: "Workout not found" });
      }

      return res.status(200).json(updatedWorkout);
    } catch (error) {
      console.error("Error updating workout completion:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

//izbrisi workout iz calendar
app.delete(
  "/workoutcalendar/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const workout = await WorkoutCalendar.findById(req.params.id);

      if (!workout) return res.status(404).send("Workout not found");

      if (workout.user.toString() !== req.user.userId) {
        return res.status(401).send("Unauthorized");
      }

      const deletedWorkout = await WorkoutCalendar.findByIdAndDelete(
        req.params.id
      );

      res.send(deletedWorkout);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
);

//Plans
app.post("/plans", authenticateToken, async (req: Request, res: Response) => {
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

app.get("/plans", authenticateToken, async (req: Request, res: Response) => {
  try {
    const plans = await Plan.find({ user: req.user.userId }).populate(
      "workouts"
    );
    res.send(plans);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Recommendations

app.get(
  "/recommendations",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const recommendation = await getWorkoutRecommendation(req.user.userId);
      res.send(recommendation);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

app.get(
  "/workoutHistory/:userId/:startDate",
  authenticateToken,
  async (req: Request, res: Response) => {
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

app.get(
  "/completedWorkouts/",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { userId } = req.user;

    try {
      const workouts = await getCompletedWorkouts(userId);
      res.json({ completedWorkouts: workouts });
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

app.get(
  "/exerciseTypeStats/",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const stats = await getExerciseTypeStats(req.user.userId);
      res.json(stats);
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

app.get(
  "/averageWorkoutDuration",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const averageDuration = await getAverageWorkoutDuration(req.user.userId);
      res.json({ averageDuration });
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

app.get(
  "/workoutLengthStats",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const { longest, shortest } = await getLongestAndShortestWorkout(
        req.user.userId
      );
      res.json({ longest, shortest });
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

app.get(
  "/mostCommonExercise",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const mostCommonExercise = await getMostCommonExercise(req.user.userId);
      res.json({ mostCommonExercise });
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

app.get(
  "/workoutFrequency/:period",
  authenticateToken,
  async (req: Request, res: Response) => {
    const period = req.params.period as "week" | "month";
    try {
      const frequency = await getWorkoutFrequency(req.user.userId, period);
      res.json({ frequency });
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

app.get(
  "/statistics/workouts-by-difficulty",
  authenticateToken,
  async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const data = await getTotalWorkoutsByDifficulty(userId);
    res.json(data);
  }
);

app.get(
  "/statistics/exercise-frequency",
  authenticateToken,
  async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const data = await getExerciseFrequency(userId);
    res.json(data);
  }
);

app.get(
  "/statistics/average-sets-reps",
  authenticateToken,
  async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const data = await getAverageSetsAndReps(userId);
    res.json(data);
  }
);

app.get(
  "/statistics/workout-streak",
  authenticateToken,
  async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const data = await getWorkoutStreak(userId);
    res.json(data);
  }
);

// 1. Most Common Muscle Group Route
app.get(
  "/statistics/most-common-muscle-group",
  authenticateToken,
  async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const data = await mostCommonMuscleGroup(userId);
    res.json(data);
  }
);

// 2. Total Weight Lifted Route
app.get(
  "/statistics/total-weight-lifted",
  authenticateToken,
  async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const data = await totalWeightLifted(userId);
    res.json(data);
  }
);

// 3. Most Used Exercise Route
app.get(
  "/statistics/most-used-exercise",
  authenticateToken,
  async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const data = await mostUsedExercise(userId);
    res.json(data);
  }
);

// 5. Most Recent Completed Workouts Route
app.get(
  "/statistics/recent-completed-workouts",
  authenticateToken,
  async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const data = await mostRecentCompletedWorkouts(userId);
    res.json(data);
  }
);

app.get("/server-time", (req: Request, res: Response) => {
  res.send(new Date().toString());
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
