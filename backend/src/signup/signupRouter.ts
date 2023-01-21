const signupRouter = require("express").Router();
const signupController = require("./signupController");

// signup
signupRouter.post("/signup", signupController.signup); // create new user account

module.exports = signupRouter;
