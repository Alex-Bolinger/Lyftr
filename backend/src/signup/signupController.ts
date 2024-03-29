import { hashPass, generateAccessToken, generateUserID, generateProfileID } from "../helpers";
import { validationResult } from "express-validator";
const roachDB = require("../roachDB");

/*
    POST /signup
    ReqBody: SignupRequest
    {
        user_credentials: UserCredentials {
            email: user email
            password: user password
        }
        user_name: full name of user
    }

    Response: LoginResponse
    {
        token: access token
    }
 */
function signup (req, res) {
    // Check if account already exists
    const userEmail = req.body.user_credentials.email;
    roachDB.User.sync({
        force: false
    }).then(function() {
        return roachDB.User.findOne({
            where: {
                email: userEmail
            }
        });
    }).then(function(user) {
        if (user != null) {
            return res.status(400).json({ message: "Account with this email already exists!" });
        }

        // User with this email does not exist - create one!
        const profileID = generateProfileID();
        const userName = req.body.user_name;
        // Start with profile
        roachDB.Profile.sync({
            force: false
        }).then(function() {
            return roachDB.Profile.create({
                id: profileID,
                full_name: userName,
                picture_link: ""
            });
        }).then(function() {
            // Profile created - now create user
            const userPassword = req.body.user_credentials.password;
            const userID = generateUserID();
            roachDB.User.sync({
                force: false
            }).then(async function() {
                return roachDB.User.create({
                    id: userID,
                    email: userEmail,
                    user_name: userName,
                    profile_id: profileID,
                    hashed_pass: await hashPass(userPassword),
                    created: Date.now()
                });
            }).then(function(user) {
                // Now generate and return access token
                res.status(200).json({
                    user: user,
                    token: generateAccessToken(userEmail)
                });
            }).catch(function(err) {
                res.status(500).json({ message: err });
            });
        }).catch(function(err) {
            res.status(500).json({ message: err });
        });
    }).catch(function(err) {
        res.status(500).json({ message: err });
    });
}

module.exports = {
    signup
};
