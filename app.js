const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/politicatransparente', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const authRoute = require('./routes/authRoute');
app.use('/Authenticate', authRoute);
const userRoute = require('./routes/userRoute');
app.use('/User', userRoute);
const postRoute = require('./routes/authRoute');
app.use('/Post', postRoute);
const empresaRoute = require('./routes/empresaRoute');
app.use('/Empresa', empresaRoute);
const votoRoute = require('./routes/votoRoute');
app.use('/Voto', votoRoute);

app.listen(3000, () => console.log('Server Started'));

