const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Diretório de uploads (cria se não existir)
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Configuração do storage do multer
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// Renders das páginas de voluntário
// GET /volunteer/register -> formulário de inscrição
router.get('/register', (req, res) => {
  // Se a view estiver em views/volunteer-register.ejs
  return res.render('volunteer-register');
});

// GET /volunteer/dashboard -> painel do voluntário
router.get('/dashboard', (req, res) => {
  return res.render('volunteer-dashboard');
});

// POST /volunteer/register -> recebe formulário com arquivos
// Ajuste os names dos campos conforme o seu formulário HTML
router.post('/register', upload.fields([
  { name: 'foto', maxCount: 1 },
  { name: 'certidao', maxCount: 1 },
  { name: 'documentoEscolar', maxCount: 1 }
]), (req, res) => {
  // Aqui você processaria req.body e req.files
  console.log('Form body:', req.body);
  console.log('Files:', req.files);

  // Exemplo simples: redireciona para dashboard após registro
  return res.redirect('/volunteer/dashboard');
});

// === CORREÇÃO AQUI: rota raiz do router ===
// Quando o Express monta o router com `app.use('/volunteer', volunteerRoute)`,
// um GET para '/volunteer' procura por GET '/' dentro deste router.
// Se não existir, aparece "Cannot GET /volunteer".
// Essa rota redireciona o usuário para o formulário de registro.
router.get('/', (req, res) => {
  return res.redirect('/volunteer/register');
});

module.exports = router;
