const auth = (req, res, next) => {
    if (!req.headers['Authorization']) {
        res.status(403).json({ success: 'KO', message: 'Authentication required.' });
    } else {
        // TODO: put here JWT authentication logic and call next() only when bearer token is received and is valid
        next();
    }
};

module.exports = auth;
