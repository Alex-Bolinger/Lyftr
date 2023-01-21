import { hashPass, generateAccessToken, generateUserID, generateProfileID } from "../helpers";
import { validationResult } from "express-validator";
import {Sequelize} from "sequelize-cockroachdb";
const cockDB = require("../cockDB");

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
        access_token: access token
    }
 */
function signup (req, res, next) {
    // Check for input validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check if account already exists
    const userEmail = req.body.user_credentials.email;
    cockDB.User.sync({
        force: false
    }).then(function() {
        return cockDB.User.findOne({
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
        const userName = req.body.user_credentials.user_name;
        // Start with profile
        cockDB.Profile.sync({
            force: false
        }).then(function() {
            return cockDB.Profile.create({
                id: profileID,
                full_name: userName,
                picture_link: ""
            })
        }).then(

        ).catch(function(err) {
            res.status(500).json({ message: err });
        })
    }).catch(function(err) {
        res.status(500).json({ message: err });
    })
    const password = req.body.user_credentials.password;

    const userID = generateUserID();


    // Create new user profile
    cockDB.Profile.sync({
        force: false
    }).then(() => {

    })

    if (true) {
        // Create jwt token
        const jwtToken = generateAccessToken({ email: email });
        return res.status(200).json({
            access_token: jwtToken
        });
    } else {
        return res.status(401).json({ message: "Invalid email/password combination!" });
    }
}

module.exports = {
    signup
};
