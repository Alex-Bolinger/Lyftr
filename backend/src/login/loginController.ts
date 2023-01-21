import { generateAccessToken } from "../helpers";

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
    const email = req.body.email;
    // const password = req.body.password;

    // TODO Get hashed user password from database and verify match
    // TODO for now, assume valid
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
    login
};
