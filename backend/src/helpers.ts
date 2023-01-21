const nodeCrypto = require("crypto");
const jwt = require("jsonwebtoken");
const keyLen = 64;
const iterations = 100;
const digest = "sha256";

function generateAccessToken (email) {
    return (jwt.sign(email, process.env.JWT_SECRET, {}));
}

function authenticateToken (req, res, next) {
    const token = req.get("Authorization");
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, email) => {
        if (err) return res.sendStatus(403);
        req.email = email;
        next();
    })
}

function hashPass (pass) {
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

function isValidPass (actualHash, givenPassword) {
    return new Promise((resolve, reject) => {
        nodeCrypto.pbkdf2(givenPassword, actualHash.hash_salt, iterations, keyLen, digest, (err, hashedGivenPassword) => {
            if (err) {
                reject(err);
            }

            resolve(actualHash.hash_pass === hashedGivenPassword.toString("base64"));
        });
    });
}

module.exports = {
    generateAccessToken,
    authenticateToken,
    hashPass,
    isValidPass
};
