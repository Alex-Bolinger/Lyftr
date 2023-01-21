const loginRouter = require("express").Router();
const loginController = require("./loginController");

// login
loginRouter.post("/login", loginController.login); // login user and return API key

module.exports = loginRouter;
