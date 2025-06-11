const User = require("../models/user.model");
const PasswordUtil = require("../utils/bcryt");
const JwtUtil = require("../utils/jwt");


// Handle user registration
const handleUserRegister = async (req, res) => {
    
    const { name, email, password } = req.body;
    console.log(req.body)
    try {
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const newUser = new User({ name, email, password });
        await newUser.save();

//  set cookie
        const sessionId =  JwtUtil.generateToken(newUser);
        res.cookie('sess_', sessionId, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(201).json({ message: 'Registration and login successful', user: { email, name } });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Handle user login
const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Please provide email and password' });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const { name } = user;


        const isPasswordCorrect = await PasswordUtil.comparePassword(password, user.password);
        if (!isPasswordCorrect) return res.json({ message: 'Incorrect password' });


        const sessionId = JwtUtil.generateToken(user);
       
        res.cookie('sess_', sessionId, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ message: 'Login successful', user: { email, name } });


    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

// Handle user logout
const handleUserLogout = async (req, res) => {
    try {
        res.clearCookie('sess_', { path: '/' });
        res.status(200).json({ message: 'Logged out' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error });
    }  

}

// Handle user authentication check
const handleAuthCheck = async (req, res) => {
    try {
        const sessionId = req.cookies.sess_;
        const user = JwtUtil.verifyToken(sessionId);
        res.status(200).json({ message: 'Authenticated', user });
    } catch (error) {
        res.status(401).json({ message: 'Unauthenticated' });
    }
}

module.exports = {
    handleUserRegister,
    handleUserLogin,
    handleUserLogout,
    handleAuthCheck
}


