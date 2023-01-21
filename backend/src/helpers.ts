const { v4: uuidv4 } = require("uuid");
const nodeCrypto = require("crypto");
const jwt = require("jsonwebtoken");
const keyLen = 64;
const iterations = 100;
const digest = "sha256";

export function generateProfileID() {
    return "profile_" + uuidv4();
}

export function generateUserID () {
    return "user_" + uuidv4();
}

export function generateWorkoutID() {
    return "workout_" + uuidv4();
}

export function generateCommentID() {
    return "comment_" + uuidv4();
}

export function generatePictureID() {
    return "picture_" + uuidv4();
}

export function generateAccessToken (email) {
    return (jwt.sign(email, process.env.JWT_SECRET, {}));
}

export function authenticateToken (req, res, next) {
    const token = req.get("Authorization");
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, email) => {
        if (err) return res.sendStatus(403);
        req.email = email;
        next();
    })
}

export function hashPass (pass) {
    return new Promise((resolve, reject) => {
        const salt = nodeCrypto.randomBytes(keyLen).toString("base64");
        nodeCrypto.pbkdf2(pass, salt, iterations, keyLen, digest, (err, key) => {
            if (err) {
                reject(err);
            }

            resolve({
                hash_salt: salt,
                hash_pass: key.toString("base64")
            });
        });
    });
}

export function isValidPass (actualHash, givenPassword) {
    return new Promise((resolve, reject) => {
        nodeCrypto.pbkdf2(givenPassword, actualHash.hash_salt, iterations, keyLen, digest, (err, hashedGivenPassword) => {
            if (err) {
                reject(err);
            }

            resolve(actualHash.hash_pass === hashedGivenPassword.toString("base64"));
        });
    });
}
