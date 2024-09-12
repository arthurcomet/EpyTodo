const express = require('express');
const pool = require('../../config/db');
const router = express.Router();

router.get("/", (req, res) => {
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

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    pool.query('SELECT * FROM todo WHERE id = ? AND user_id = ?', [id, userId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(results[0]);
    });
});

router.post("/", (req, res) => {
    const { title, description, due_time, status = 'not started' } = req.body;
    const userId = req.user.id;

    const isValidDate = (date) => {
        return !isNaN(Date.parse(date));
    };

    if (!isValidDate(due_time)) {
        return res.status(400).json({ error: 'Invalid date format for due_time' });
    }

    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

    pool.query(
        'INSERT INTO todo (title, description, created_at, due_time, status, user_id) VALUES (?, ?, ?, ?, ?, ?)',
        [title, description, created_at, due_time, status, userId],
        (error, results) => {
            if (error) {
                console.error('Database query failed:', error);
                return res.status(500).json({ error: 'Database query failed' });
            }
            res.status(201).json({ message: 'Todo added successfully'});
        }
    );
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;
    const { title, description, due_time, status } = req.body;

    const isValidDate = (date) => {
        return !isNaN(Date.parse(date));
    };

    if (!isValidDate(due_time)) {
        return res.status(400).json({ error: 'Invalid date format for due_time' });
    }

    pool.query('UPDATE todo SET title = ?, description = ?, due_time = ?, status = ? WHERE id = ? AND user_id = ?',
        [title, description, due_time, status, id, userId], (error, results) => {
        if (error) {
            console.error('Database query failed:', error);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json({ message: 'Todo updated successfully' });
    });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    pool.query('DELETE FROM todo WHERE id = ? AND user_id = ?', [id, userId], (error, results) => {
        if (error) {
            console.error('Database query failed:', error);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json({ msg: 'succesfully deleted record number: ' + id });
    });
});

module.exports = router;
