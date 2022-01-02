const express = require('express');
const router = express.Router();
const multer = require('multer');

// ----------SETUP MULTER------------
const maxfileSize = 20000000 // 20MB
const storage = multer.memoryStorage()
const upload = multer({ 
  storage: storage,
  limits: { fileSize: maxfileSize }
});

const profileController = require('../controllers/profileController');

router.post('/edit', upload.fields([{ name: 'avatar', maxCount: 1 }]), profileController.edit);
router.get('/',profileController.show);
module.exports = router;