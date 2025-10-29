const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get('/register', (_, res) => res.render('volunteer-register'));
router.get('/dashboard', (_, res) => res.render('volunteer-dashboard'));
router.post('/register', upload.fields([
  { name: 'foto', maxCount: 1 },
  { name: 'certidao', maxCount: 1 },
  { name: 'documentoEscolar', maxCount: 1 }
]), (req, res) => {
  console.log(req.body, req.files);
  res.redirect('/volunteer/dashboard');
});

module.exports = router;
