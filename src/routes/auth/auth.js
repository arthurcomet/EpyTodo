const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../../config/db');
const dotenv = require('dotenv');
const router = express.Router();

dotenv.config();

const internalServerError = (res) => {
    res.status(500).json({ msg: "Internal server error" });
}

function insertIntoDb(email, name, firstname, password, res) {
    pool.query(
        'INSERT INTO user (email, name, firstname, password) VALUES (?, ?, ?, ?)',
        [email, name, firstname, password],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: error });
            }
            const token = jwt.sign({ id: results.insertId }, process.env.SECRET, { expiresIn: "1h" });
            res.status(201).json({ token: "Token of the newly registered user " + token });
        }
    );
}

function checkIfEmailExists(email, callback) {
    pool.query(
        'SELECT * FROM user WHERE email = ?',
        [email],
        (error, results) => {
            if (error) {
                return callback(error, null);
            }
            if (results.length > 0) {
                return callback(null, true);
            }
            return callback(null, false);
        }
    );
}

router.post('/register', async (req, res) => {
    const { email, name, firstname, password } = req.body;

    if (!email || !name || !firstname || !password) {
        return res.status(400).json({ msg: 'Bad parameter' });
    }

    checkIfEmailExists(email, async (error, exists) => {
        if (error) {
            return internalServerError(res);
        }
        if (exists) {
            return res.status(400).json({ msg: 'account already exists' });
        }
        try {
            const cryptedPassword = await bcrypt.hash(password, 10);
            insertIntoDb(email, name, firstname, cryptedPassword, res);
        } catch (error) {
            internalServerError(res);
        }
    });
});

//<---------------------------------------------------------------------->

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Bad parameter' });
    }
    try {
        const [results] = await pool.promise().query('SELECT * FROM user WHERE email = ?', [email]);

        if (results.length === 0) {
            return res.status(404).json({ msg: 'Invalid Credentials' });
        }
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: "1h" });
        res.status(200).json({ token: 'Token of the newly logged in user' + token });
    } catch (error) {
        internalServerError(res);
    }
});

module.exports = router;






















