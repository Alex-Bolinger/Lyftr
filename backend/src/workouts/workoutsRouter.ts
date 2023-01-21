const workoutsRouter = require("express").Router();
const workoutsController = require("./workoutsController");
import { body } from "express-validator";

// workouts
workoutsRouter.get("/workouts", workoutsController.getWorkouts); // query for group of workouts or get one by ID
workoutsRouter.put(
    "/workouts",
    body("name").isLength({ min: 1, max: 255 }),
    workoutsController.updateWorkout); // update info for a particular workout by ID TODO Add more validation
workoutsRouter.post(
    "/workouts",
    body("name").isLength({ min: 1, max: 255 }),
    workoutsController.addWorkout); // add a new workout TODO add more validation

// workouts/comments
workoutsRouter.get("/workouts/comments", workoutsController.getComments); // get comments for a particular workout by ID
workoutsRouter.put("/workouts/comments", workoutsController.updateComment); // update particular comment
workoutsRouter.post("/workouts/comments", workoutsController.addComment); // add a workout comment

// workouts/pictures
workoutsRouter.get("/workouts/pictures", workoutsController.getPictures); // get photos for a particular workout
workoutsRouter.post("/workouts/pictures", workoutsController.addPicture); // add workout picture
workoutsRouter.delete("/workouts/pictures", workoutsController.deletePicture); // delete workout picture

module.exports = workoutsRouter;
