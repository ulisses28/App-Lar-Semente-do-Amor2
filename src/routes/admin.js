// src/routes/admin.js
const express = require('express');
const router = express.Router();

// Exemplo de rota administrativa
router.get('/', (req, res) => {
  res.render('admin-dashboard', { title: 'Painel do Administrador' });
});

// Exemplo de rota de login de admin
router.get('/login', (req, res) => {
  res.render('admin-login', { title: 'Login do Admin' });
});

// Exemplo de rota de gestão
router.get('/manage', (req, res) => {
  res.render('admin-manage', { title: 'Gerenciar Dados' });
});

module.exports = router;
