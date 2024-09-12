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

function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

function insertIntoDb(email, name, firstname, password, res) {
    pool.query(
        'INSERT INTO user (email, name, firstname, password) VALUES (?, ?, ?, ?)',
        [email, name, firstname, password],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: error });
            }
            res.status(201).json({ msg: "User registered successfully" });
        }
    );
};

router.post('/register', async (req, res) => {
    const { email, name, firstname, password } = req.body;

    if (!email || !name || !firstname || !password) {
        return res.status(400).json({ msg: 'Bad parameter' });
    }

    try {
        const cryptedPassword = await hashPassword(password);
        insertIntoDb(email, name, firstname, cryptedPassword, res);
    } catch (error) {
        internalServerError(res);
    }
});

module.exports = router;





















