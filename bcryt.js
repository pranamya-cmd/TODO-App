const bcrypt = require('bcryptjs');


class PasswordUtil{
    static async hashPassword(password){
        return await bcrypt.hash(password, 10);
    }

    static async comparePassword(password, hashPassword){
        return await bcrypt.compare(password, hashPassword);
    }
}

module.exports = PasswordUtil;