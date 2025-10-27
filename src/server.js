// src/server.js

//---------------------------------------------
// 🔹 Importações e configuração
//---------------------------------------------
const express = require('express');
const path = require('path');
const { admin, firebaseApp, db, bucket } = require('./config/firebaseConfig');
const adminRoutes = require('./routes/admin');
const volunteerRoutes = require('./routes/volunteerRoute');

const app = express();
const port = 8888;

//---------------------------------------------
// 🔹 Configurações do Express
//---------------------------------------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views')); // Pasta views fora de src

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

//---------------------------------------------
// 🔹 Rotas públicas
//---------------------------------------------
app.get('/', (req, res) => res.render('login'));
app.get('/donations', (req, res) => res.render('donations'));
app.get('/volunteer', (req, res) => res.render('volunteer-register'));
app.get('/volunteer-dashboard', (req, res) => res.render('volunteer-dashboard'));
app.get('/acolito', (req, res) => res.render('acolito-register'));
app.get('/acolito-dashboard', (req, res) => res.render('acolito-dashboard'));
app.get('/account', (req, res) => res.render('account'));

//---------------------------------------------
// 🔹 Rotas externas
//---------------------------------------------
app.use('/', volunteerRoutes);   // Rotas públicas de voluntários
app.use('/admin', adminRoutes);  // Rotas administrativas

//---------------------------------------------
// 🔹 Inicializa o servidor
//---------------------------------------------
app.listen(port, () => {
  console.log(`✅ Servidor rodando em http://localhost:${port}`);
});
