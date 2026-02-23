const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/constants");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            throw new Error("Token not found");
        }

        const decodedUser = jwt.verify(token, JWT_SECRET);
        req.user = decodedUser;
        next();
    } catch (err) {
        res.status(401).send("Authentication failed: " + err.message);
    }
};

module.exports = auth;
