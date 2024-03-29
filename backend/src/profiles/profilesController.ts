const roachDB = require("../roachDB");
import { validationResult } from "express-validator";

/*
    GET /profiles
    ReqBody: None
    Query Params: id (optional)
    TODO: add other query methods

    Response: UserProfile
    {
        id: unique id of user profile
        full_name: full name of user
        picture_link: link to user picture
    }
 */
function getProfiles (req, res) {
    // Check for id query param
    let profile_id = req.query.id;
    if (profile_id != null) {
        // Find and return this specific profile
        roachDB.Profile.sync({
            force: false
        }).then(function() {
            return roachDB.Profile.findOne({
                where: {
                    id: profile_id
                }
            });
        }).then(function(profile) {
            res.status(200).json(profile);
        }).catch(function(error) {
            res.status(500).json({ message: error });
        })
    } else {
        // Find and return all profiles
        // TODO: add paging of results here
        roachDB.Profile.sync({
            force: false
        }).then(function() {
            return roachDB.Profile.findAll();
        }).then(function(profiles) {
            res.status(200).json(profiles);
        }).catch(function(error) {
            res.status(500).json({ message: error });
        });
    }
}

/*
    PUT /profiles
    ReqBody: UserProfile {
        id: unique id of user profile
        full_name: full name of user
        picture_link: link to user picture
    }
    Query Params: profile id

    Response: UserProfile
    {
        id: unique id of user profile
        full_name: full name of user
        picture_link: link to user picture
    }
 */
function updateProfile (req, res) {
    let profile_id = req.query.id;
    if (profile_id == null) {
        res.status(400).json({ message: "Missing required param: profile_id" })
    }

    // Update row with this ID
    let full_name = req.body.full_name;
    let picture_link = req.body.picture_link
    roachDB.Profile.update({
        full_name: full_name,
        picture_link: picture_link
    }, {
        where: {
            id: profile_id
        }
    }).then(function(updatedRows) {
        res.status(200).json(updatedRows);
    }).catch(function(error) {
        res.status(500).json( {message: error} );
    })
}

module.exports = {
    getProfiles,
    updateProfile
};
