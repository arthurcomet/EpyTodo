const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

//Routes
const authRoutes = require('./routes/auth/auth');

dotenv.config();

app.use(express.json());
app.use('/', authRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
