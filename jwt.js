const jwt = require('jsonwebtoken');

class JwtUtil {

    static generateToken(user) {
        const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
        }

        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    }


    static verifyToken(token) {
        if (!token) return null;

        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return null;
        }
    }

}

module.exports = JwtUtil;