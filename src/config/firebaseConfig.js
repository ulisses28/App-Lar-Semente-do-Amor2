// src/config/firebaseConfig.js

const admin = require('firebase-admin');
const path = require('path');

// Caminho absoluto até o arquivo firebase-key.json
const serviceAccount = require(path.join(__dirname, '../../firebase-key.json'));

// Inicializa o Firebase apenas uma vez
const firebaseApp = admin.apps.length
  ? admin.app()
  : admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: 'doacao-orfanato-app.appspot.com', // 🔸 Substitua se necessário
    });

// Exporta as instâncias úteis
const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { admin, firebaseApp, db, bucket };
