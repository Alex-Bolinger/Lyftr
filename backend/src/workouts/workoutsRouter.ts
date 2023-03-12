const workoutsRouter = require("express").Router();
const workoutsController = require("./workoutsController");
import { body } from "express-validator";
const { authenticateToken, fetchUser, checkValidation } = require("../helpers");

// workouts
workoutsRouter.get(
    "/workouts",
    authenticateToken,
    fetchUser,
    workoutsController.getWorkouts
); // query for group of workouts or get one by ID
workoutsRouter.put(
    "/workouts",
    authenticateToken,
    fetchUser,
    body("name").exists().isLength({ min: 1, max: 255 }),
    body("workout_id").exists().isLength({ min: 1 }),
    checkValidation,
    workoutsController.updateWorkout
); // update info for a particular workout by ID TODO Add more validation (do this in a typescript way)
workoutsRouter.post(
    "/workouts",
    authenticateToken,
    fetchUser,
    body("name").exists().isLength({ min: 1, max: 255 }),
    checkValidation,
    workoutsController.addWorkout
); // add a new workout TODO add more validation (do this in a typescript way)

// workouts/comments
workoutsRouter.get(
    "/workouts/comments",
    authenticateToken,
    workoutsController.getComments
); // get comments for a particular workout by ID
workoutsRouter.put(
    "/workouts/comments",
    authenticateToken,
    workoutsController.updateComment
); // update particular comment
workoutsRouter.post(
    "/workouts/comments",
    authenticateToken,
    workoutsController.addComment
); // add a workout comment

// workouts/pictures
workoutsRouter.get(
    "/workouts/pictures",
    authenticateToken,
    workoutsController.getPictures
); // get photos for a particular workout
workoutsRouter.post(
    "/workouts/pictures",
    authenticateToken,
    workoutsController.addPicture
); // add workout picture
workoutsRouter.delete(
    "/workouts/pictures",
    authenticateToken,
    workoutsController.deletePicture
); // delete workout picture

module.exports = workoutsRouter;
