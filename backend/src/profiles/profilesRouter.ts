const profilesRouter = require("express").Router();
const profilesController = require("./profilesController");

// profiles
profilesRouter.get("/profiles", profilesController.getProfiles); // get by ID? email?
profilesRouter.put("/profiles", profilesController.updateProfile); // update by ID?

module.exports = profilesRouter;
