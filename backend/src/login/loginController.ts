import {generateAccessToken, hashPass, hashPassWithSalt} from "../helpers";
const cockDB = require("../cockDB");

/*
    POST /login
    ReqBody: UserCredentials
    {
        email: user email
        password: user password
    }

    Response: LoginResponse
    {
        access_token: access token
    }
 */
function login (req, res) {
    // Validate login information
    const userEmail = req.body.email;
    const passwordAttempt = req.body.password;

    // Find user account in database
    cockDB.User.sync({
        force: false
    }).then(function() {
        return cockDB.User.findOne({
            where: {
                email: userEmail
            }
        });
    }).then(async function(user) {
        if (user == null) {
            return res.status(400).json({ message: "Incorrect email / password combination!" });
        }

        // Compare hashed passwords
        const hashedPassword = user.hashed_pass;
        const hashedPasswordAttempt = await hashPassWithSalt(passwordAttempt, hashedPassword.hash_salt);

        // @ts-ignore
        if (hashedPassword.hash_pass != hashedPasswordAttempt.hash_pass) {
            return res.status(401).json({ message: "Incorrect email / password combination!" });
        }

        // Password is correct - grant new token
        const jwtToken = generateAccessToken({ email: userEmail });
        return res.status(200).json({
            access_token: jwtToken
        });
    }).catch(function(err) {
        res.status(500).json({ message: err });
    });
}

module.exports = {
    login
};
