const jwt = require('jsonwebtoken');
// const Blog = require("../models/blog");


const requireAuth = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    try {
        const decoded = jwt.verify(token, 'your-secret-key'); // Replace with your actual secret key
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = { requireAuth }