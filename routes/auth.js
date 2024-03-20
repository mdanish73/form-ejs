const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

router.post('/register', async (req, res) => {
    try {
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await userModel.create({ ...req.body, password: encryptedPassword });

        res.json({
            success: true,
            message: user
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Something Went Wrong, Please Try Again Later...'
        });
    };
});

router.post('/login', async (req, res) => {
    try {
        const data = { userName: "admin", password: "admin" };

        const userData = req.body;

        if ((userData.userName === data.userName) && (userData.password === data.password)) {
            var token0 = jwt.sign({ userName: "admin" }, "userCredentials___73", { expiresIn: "30s" });
            var token1 = jwt.sign({ userName: "admin" }, "userCredentials___73", { expiresIn: "07d" });

            res.cookie("accessToken", token0, { secure: true, httpOnly: true });
            res.cookie("refreshToken", token1, { secure: true, httpOnly: true });

            res.json({
                success: true,
                message: "Logged In Successfully..."
            });
        } else {
            res.status(403).json({
                success: false,
                message: "Invalid Username or Password..."
            })
        };
    } catch {
        res.status(500).json({
            success: false,
            message: "Something Went Wrong, Please Try Again Later..."
        });
    };
});

module.exports = router;