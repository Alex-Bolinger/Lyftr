const profilesRouter = require("express").Router();
const profilesController = require("./profilesController");
const { authenticateToken, fetchUser, checkValidation } = require("../helpers");
import { body } from "express-validator";

// profiles
profilesRouter.get(
    "/profiles",
    authenticateToken,
    fetchUser,
    profilesController.getProfiles
); // get by ID? email?
profilesRouter.put(
    "/profiles",
    authenticateToken,
    body("full_name").isLength({ min: 1, max: 255 }),
    checkValidation,
    profilesController.updateProfile
); // TODO update by ID?

module.exports = profilesRouter;
