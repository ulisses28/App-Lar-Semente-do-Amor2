const express = require('express');
const session = require('express-session');
const path = require('path');

const volunteerRoute = require('./routes/volunteerRoute');
const acolitoRoute = require('./routes/acolitoRoute');

const app = express();
const PORT = process.env.PORT || 8888;

// Configurações básicas
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Sessão para guardar estado do login
app.use(session({
  secret: 'chave-secreta-segura',
  resave: false,
  saveUninitialized: true
}));

// Middleware para proteger páginas (verifica login)
function checkAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

// Define o EJS como view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// 🔹 Rota inicial → redireciona para login
app.get('/', (req, res) => {
  res.redirect('/login');
});

// 🔹 Página de login (carrega seu login.ejs)
app.get('/login', (req, res) => {
  res.render('login');
});

// 🔹 Logout (encerra sessão e volta ao login)
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// 🔹 Simulação simples de login — POST via formulário
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // ⚠️ Aqui você pode integrar o Firebase Admin SDK ou autenticação real
  if (email === 'admin@alsa.com' && password === '123456')  {
    req.session.user = email;
    return res.redirect('/home');
  }

  res.render('login', { error: 'Credenciais inválidas' });

});

// 🔹 Página inicial protegida
app.get('/home', checkAuth, (req, res) => {
  res.render('home', { user: req.session.user });
});

// 🔹 Rotas protegidas (voluntários, acólitos, etc.)
app.use('/volunteer', checkAuth, volunteerRoute);
app.use('/acolito', checkAuth, acolitoRoute);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
