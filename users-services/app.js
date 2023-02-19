const express = require('express');
require('express-async-errors');
const sequelize = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./user.model');

const app = express();

app.use(express.json());

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
    console.log(`Users Service at ${port}`);
});

app.post('/signup', (req, res) => {
    // retrieve user's credentials
    const { username, email, password } = req.body;

    // check if user already exists
    const userExists = checkIfUserExists(username, email);

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // hash password and store user data
    const hashedPassword = hashPassword(password);
    storeUserData(username, email, hashedPassword);

    return res.status(200).json({ message: 'User successfully signed up' });
});


app.post('/signin', (req, res) => {
    // retrieve user's credentials
    const { username, password } = req.body;

    // check if user exists and credentials are correct
    const user = getUserData(username);

    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordCorrect = comparePasswords(password, user.hashedPassword);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // create and return authentication token
    const token = createAuthToken(user.id);
    return res.status(200).json({ token });
});

app.post('/reset-password', (req, res) => {
    // retrieve user's credentials
    const { username, email } = req.body;

    // check if user exists and email is correct
    const user = getUserData(username);

    if (!user || user.email !== email) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // generate and send password reset token to user's email
    const resetToken = generatePasswordResetToken();
    sendPasswordResetEmail(user.email, resetToken);

    return res.status(200).json({ message: 'Password reset instructions sent' });
});

app.post('/reset-password-confirm', (req, res) => {
    // retrieve user's new password and reset token
    const { newPassword, resetToken } = req.body;

    // verify reset token and update user's password
    const userId = verifyPasswordResetToken(resetToken);
    const hashedPassword = hashPassword(newPassword);
    updatePassword(userId, hashedPassword);

    return res.status(200).json({ message: 'Password successfully reset' });
});
router.get('/healthcheck', (req, res) => {
    res.send('OK');
});


sequelize.sync();
