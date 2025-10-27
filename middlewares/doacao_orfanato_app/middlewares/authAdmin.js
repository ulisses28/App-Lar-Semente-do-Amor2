// middlewares/authAdmin.js

const { admin } = require('../server'); // importa o firebase-admin do server.js

// lista de e-mails autorizados como administradores
const ADMINS = [
  'admin@larsementedoamor.org',   // substitua pelos e-mails reais
  'arthurcorona@gmail.com'        // exemplo
];

// middleware para verificar se o usuário é admin
async function verifyAdmin(req, res, next) {
  try {
    // token vem no cabeçalho Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send('Acesso não autorizado - token ausente');
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decoded = await admin.auth().verifyIdToken(idToken);

    // verifica se o e-mail está na lista de administradores
    if (!decoded || !ADMINS.includes(decoded.email)) {
      return res.status(403).send('Acesso restrito a administradores');
    }

    req.user = decoded; // salva dados do usuário para usar depois
    next();
  } catch (err) {
    console.error('Erro na verificação do admin:', err);
    return res.status(401).send('Token inválido ou expirado');
  }
}

module.exports = verifyAdmin;
