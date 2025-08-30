const jwt = require('jsonwebtoken')
const { user_jwt_secret }  = require("../config")


function userMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.token;
        console.log(user_jwt_secret)
        const decodedToken = jwt.verify(authHeader, user_jwt_secret)

        if (decodedToken) {
            req.userId = decodedToken.id
            
        } else {
            return res.json({
                Message: "Session-Expired, re-login"
            })
        }
        next()

    } catch (error) {

        console.error("JWT verification failed:", error.message);

        return res.status(403).json({ message: "Invalid or expired token" });
    }

}

module.exports = userMiddleware