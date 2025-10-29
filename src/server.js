const express = require('express');
const path = require('path');
const fs = require('fs');
const volunteerRoute = require('./routes/volunteerRoute');

const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

app.get('/', (req, res) => res.render('home'));
app.use('/volunteer', volunteerRoute);

app.listen(8888, () => console.log('🚀 Servidor: http://localhost:8888'));