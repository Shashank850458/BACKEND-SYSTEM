const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const dataRoutes = require('./routes/dataRoutes');
const retrieveRoutes = require('./routes/retrieveRoutes');
const updateRoutes = require('./routes/updateRoutes');
const deleteRoutes = require('./routes/deleteRoutes'); 

app.use('/', userRoutes);
app.use('/', tokenRoutes);
app.use('/', dataRoutes);
app.use('/', retrieveRoutes); 
app.use('/', updateRoutes);
app.use('/', deleteRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
