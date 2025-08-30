const jwt = require('jsonwebtoken')
const { admin_jwt_secret }= require("../config")


function adminMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.token;
        const decodedToken = jwt.verify(authHeader, admin_jwt_secret)

        if (decodedToken) {
            req.adminId = decodedToken.id

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

module.exports = adminMiddleware