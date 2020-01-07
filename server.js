const express = require('express');
// const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const cors = require('cors');
const path = require('path');

const app = express();

// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Routes
const items  = require('./routes/api/items');
const users  = require('./routes/api/users');

// Use routes
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets(front-end build folder) if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Database
const db = require('./config/database');

// Test db
db.sync()
  .then(() => {
    app.listen(PORT);
    console.log(`My app is running on port ${PORT}`);
    console.log('Database connected...');
  })
  .catch(e => console.log('error...', e));
