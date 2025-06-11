const express = require("express");
const router = express.Router();

const { handleUserRegister, handleUserLogin, handleUserLogout, handleAuthCheck } = require("../controllers/user.controller");


router.post("/register", handleUserRegister);
router.post("/login", handleUserLogin);
router.post("/logout", handleUserLogout);
router.get('/auth-check', handleAuthCheck);


module.exports = router;