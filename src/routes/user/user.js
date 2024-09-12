const express = require('express');
const pool = require('../../config/db');
const router = express.Router();

router.get("/", (req, res) => {
    const id = req.user.id;

    pool.query('SELECT * FROM user WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(results[0]);
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;

    pool.query('SELECT * FROM user WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Userid not found' });
        }
        res.json(results[0]);
    });
});

router.get("/email/:email", (req, res) => {
    const email = req.params.email;

    pool.query('SELECT * FROM user WHERE email = ?', [email], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(results[0]);
    });
})

router.get("/todos", (req, res) => {
    const userId = req.user.id;

    pool.query('SELECT * FROM todo WHERE user_id = ?', [userId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No todos found for this user' });
        }
        res.json(results);
    });
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { email, name, firstname, created_at, password } = req.body;

    const isValidDate = (date) => {
        return !isNaN(Date.parse(date));
    };

    if (!isValidDate(created_at)) {
        return res.status(400).json({ error: 'Invalid date format for created_at' });
    }

    pool.query('UPDATE user SET email = ?, name = ?, firstname = ?, created_at = ?, password = ? WHERE id = ?',
        [email, name, firstname, created_at, password, id], (error, results) => {
        if (error) {
            console.error('Database query failed:', error);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json({ message: 'User updated successfully' });
    });
});

module.exports = router;
