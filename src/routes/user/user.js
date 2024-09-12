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
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(results[0]);
    });
});

router.get("/:id/:todos", (req, res) => {
    const id = req.params.id;

    pool.query('SELECT * FROM todo WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(results[0]);
    });
});

module.exports = router;
