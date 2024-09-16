// Imports
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        // Extract the token from the Authorization header
        const token = req.headers.authorization.split(' ')[1];
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // Extract the userId from the decoded token
        const userId = decodedToken.userId;
        // Add the auth information to the request object
        req.auth = {
            userId: userId
        };
        next();
    } catch(error) {
        // If token is invalid or not present, send 401 Unauthorized
        res.status(401).json({ error });
    };
};