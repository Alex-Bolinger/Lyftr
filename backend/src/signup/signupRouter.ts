import { body } from "express-validator";
const signupRouter = require("express").Router();
const signupController = require("./signupController");
const { checkValidation } = require("../helpers");

// signup (with middleware input validation)
signupRouter.post(
    "/signup",
    body("user_credentials.email").isEmail(),
    body("user_credentials.password").isLength({ min: 5, max: 120 }),
    body("user_name").isLength({min: 1, max: 255 }),
    checkValidation,
    signupController.signup
); // create new user account

module.exports = signupRouter;
