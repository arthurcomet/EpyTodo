const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

console.log('Secret:', process.env.SECRET);
console.log('Port:', process.env.PORT);

// Routes
const authRoutes = require('./routes/auth/auth');

app.use(express.json());
app.use('/', authRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
