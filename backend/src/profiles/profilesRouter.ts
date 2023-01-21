const profilesRouter = require("express").Router();
const profilesController = require("./profilesController");
import { body } from "express-validator";

// profiles
profilesRouter.get("/profiles", profilesController.getProfiles); // get by ID? email?
profilesRouter.put(
    "/profiles",
    body("full_name").isLength({ min: 1, max: 255 }),
    profilesController.updateProfile); // update by ID?

module.exports = profilesRouter;
