// src/routes/volunteerRoute.js

const express = require('express');
const router = express.Router();
const { db } = require('../config/firebaseConfig');

//---------------------------------------------
// 🔹 Página de registro do voluntário
//---------------------------------------------
router.get('/register', (req, res) => {
  res.render('volunteer-register');
});

//---------------------------------------------
// 🔹 Salvar voluntário no Firebase
//---------------------------------------------
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, address, skills } = req.body;

    if (!name || !email) {
      return res.status(400).send('Nome e e-mail são obrigatórios.');
    }

    await db.collection('volunteers').add({
      name,
      email,
      phone,
      address,
      skills,
      createdAt: new Date(),
    });

    res.redirect('/volunteer-dashboard');
  } catch (error) {
    console.error('Erro ao registrar voluntário:', error);
    res.status(500).send('Erro ao registrar voluntário.');
  }
});

//---------------------------------------------
// 🔹 Painel do voluntário (exemplo)
//---------------------------------------------
router.get('/volunteer-dashboard', async (req, res) => {
  try {
    const volunteersSnapshot = await db.collection('volunteers').get();
    const volunteers = volunteersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.render('volunteer-dashboard', { volunteers });
  } catch (error) {
    console.error('Erro ao carregar dashboard:', error);
    res.status(500).send('Erro ao carregar painel de voluntários.');
  }
});

module.exports = router;
