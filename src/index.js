const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

console.log('Secret:', process.env.SECRET);
console.log('Port:', process.env.PORT);

app.use(express.json());

const authRoutes = require('./routes/auth/auth');
const userRoutes = require('./routes/user/user');

const authenticateJWT = require('./middleware/auth');

app.use('/', authRoutes);
app.use('/user', authenticateJWT, userRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
