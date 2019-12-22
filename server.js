import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import Sequelize from 'sequelize';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;


// Routes
import items from './routes/api/items';

// Use routes
app.use('/api/items', items);

// Serve static assets(front-end build folder) if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Database
import db from './config/database';

// Test db
db.sync()
  .then(() => {
    app.listen(PORT);
    console.log(`My app is running on port ${PORT}`);
    console.log('Database connected...');
  })
  .catch(e => console.log('error...', e));
