// TODO import stuff

/*
    GET /profiles
    ReqBody: None
    Query Params: Name? TODO

    Response: UserProfile
    {
        id: unique id of user profile
        full_name: full name of user
        picture_link: link to user picture
    }
 */
function getProfile (req, res, next) {
    // TODO
    res.status(200).json({
        id: "profile_asdfsadfasdf",
        full_name: "Aiden Gonzalez",
        "picture_link": ""
    });
}

/*
    PUT /profiles
    ReqBody: UserProfile {
        id: unique id of user profile
        full_name: full name of user
        picture_link: link to user picture
    }
    Query Params: id TODO

    Response: UserProfile
    {
        id: unique id of user profile
        full_name: full name of user
        picture_link: link to user picture
    }
 */
function updateProfile (req, res, next) {
    // TODO
    res.status(200).json({
        id: "profile_asdfsadfasdf",
        full_name: "Alex Bolinger",
        "picture_link": ""
    });
}

module.exports = {
    getProfile,
    updateProfile
};
