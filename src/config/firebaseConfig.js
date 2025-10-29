// src/config/firebaseConfig.js

const admin = require('firebase-admin');
const path = require('path');

// Caminho absoluto até o arquivo de credenciais
const serviceAccount = require(path.join(__dirname, '../../firebase-key.json'));

// Inicializa o Firebase apenas uma vez
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'doacao-orfanato-app.appspot.com', // ✅ substitua se o bucket tiver outro nome
  });
}

// Exporta instâncias reutilizáveis
const firebaseApp = admin.app();
const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { admin, firebaseApp, db, bucket };
