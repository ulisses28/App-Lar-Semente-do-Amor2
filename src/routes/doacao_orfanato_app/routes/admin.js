// src/routes/admin.js

const express = require('express');
const router = express.Router();
const { db } = require('../config/firebaseConfig');

//---------------------------------------------
// 🔹 Painel administrativo (exemplo)
//---------------------------------------------
router.get('/', async (req, res) => {
  try {
    const volunteersSnapshot = await db.collection('volunteers').get();
    const volunteers = volunteersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.render('admin-panel', { volunteers });
  } catch (error) {
    console.error('Erro ao carregar painel admin:', error);
    res.status(500).send('Erro ao carregar o painel administrativo.');
  }
});

//---------------------------------------------
// 🔹 Deletar voluntário
//---------------------------------------------
router.post('/delete-volunteer/:id', async (req, res) => {
  const volunteerId = req.params.id;

  try {
    await db.collection('volunteers').doc(volunteerId).delete();
    res.redirect('/admin');
  } catch (error) {
    console.error('Erro ao deletar voluntário:', error);
    res.status(500).send('Erro ao deletar voluntário.');
  }
});

module.exports = router;
