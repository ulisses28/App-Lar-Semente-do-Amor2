const express = require('express');
const router = express.Router();

// Página principal dos acólitos
router.get('/', (req, res) => {
  res.render('acolito/dashboard', { user: req.session.user });
});

// Página de registrar acólito
router.get('/registrar', (req, res) => {
  res.render('acolito/registrar', { user: req.session.user });
});

router.post('/registrar', (req, res) => {
  const { nome, idade, funcao } = req.body;
  console.log('Novo acólito registrado:', nome, idade, funcao);
  res.redirect('/acolito');
});

module.exports = router;
