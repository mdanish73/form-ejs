const express = require('express');
const mongoose = require('mongoose');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const formRoutes = require('./routes/students');
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static( __dirname + './public' ));
app.use(cookieParser());

app.use(express.json());
app.use('/form', formRoutes);
app.use('/auth', authRoutes);


mongoose.connect('mongodb://127.0.0.1:27017/server').then((res) => {
    console.log("Database Connection Established...");
}).catch((error) => {
    console.log(error.message);
});

app.use('/', (req, res) => {
    app.render(__dirname + '/views/index.ejs');
});
app.use('/', (req, res) => {
    res.send("Server is Running...");
});

app.use('/login', (req, res) => {
    if (req.cookies.accessToken) {
        try {
            var isTokenValid = jwt.verify(req.cookies.accessToken, "userCredentials___73");
            res.redirect('/form');
        } catch (error) {
            console.log(error.message);
        };
    };

    res.render(__dirname + '/views/login.ejs');
});

app.use('/register', (req, res) => {
    res.render(__dirname + '/views/register.ejs');
});

app.use('/form', (req, res) => {
    if (req.cookies.accessToken) {
        try {
            var isTokenValid = jwt.verify(req.cookies.accessToken, "userCredentials___73");
        } catch (error) {
            try {
                var isTokenValid = jwt.verify(req.cookies.refreshToken, "userCredentials___73");
                
                var token0 = jwt.sign({ userName: 'admin' }, "userCredentials___73", { expiresIn: "30s" });
                var token1 = jwt.sign({ userName: 'admin' }, "userCredentials___73", { expiresIn: "07d" });
                
                res.cookie("accessToken", token0, { secure: true, httpOnly: true });
                res.cookie("refreshToken", token1, { secure: true, httpOnly: true });
            } catch {
                res.redirect('/login');
            };
        };
    } else {
        res.redirect('/login');
    };

    res.render( __dirname + '/views/form.ejs' );
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});