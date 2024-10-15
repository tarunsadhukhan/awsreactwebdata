const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const db = require('./Connection');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const formRoutes = require('./routes/formRoutes');
const companyRoutes = require('./routes/companyRoutes');
const doffRoutes = require('./routes/doffRoutes');
const masterRoutes = require('./routes/masterRoutes');

app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/form', formRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/doffRoutes', doffRoutes); // Fixed
app.use('/api/masterRoutes', masterRoutes); // Fixed

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
