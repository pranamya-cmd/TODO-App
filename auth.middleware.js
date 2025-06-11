const JwtUtil = require('../utils/jwt');

const checkAuth = (req, res, next) => {

    const token = req.cookies?.sess_ || req.headers.cookie.split('=')[1];
    const user = JwtUtil.verifyToken(token);

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();

};

module.exports = checkAuth;