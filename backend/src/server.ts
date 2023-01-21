require("dotenv").config();
import express from 'express';

// Server port
const port = process.env.PORT;

// Server
const server = express();

// Body parser middleware
const BodyParser = require("body-parser");
server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: true }));

// Spec validator middleware (using to validate requests)
const OpenApiValidator = require("express-openapi-validator");
server.use(
    OpenApiValidator.middleware({
        apiSpec: "./lyftr.json",
        validateRequests: true, // true by default
        validateResponses: false // false by default
    })
);

// Error handling middleware
server.use((err, req, res, next) => {
    // format error
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors
    });
});

// Routers
const loginRouter = require("./login/loginRouter");
const profilesRouter = require("./profiles/profilesRouter");
const signupRouter = require("./signup/signupRouter");
const workoutsRouter = require("./workouts/workoutsRouter");
server.use("/api", loginRouter);
server.use("/api", profilesRouter);
server.use("/api", signupRouter);
server.use("/api", workoutsRouter);

// Base endpoint
server.get('/', (req, res) => {
    res.send('Server OK');
});

server.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});

module.exports = server;
