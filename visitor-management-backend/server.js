const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// Middlewareuiiiiiiiiiiiiiiiiiiiiiiiiii
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const uri = 'your_mongodb_connection_string';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Node.js backend');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
