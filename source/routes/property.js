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

const propertyController = require('../controllers/propertyController');

router.get('/page/:currentPage', propertyController.loadProperties);

// upload.fields include name attribute in <img> tags
router.post('/add', upload.fields([{ name: 'inputPreviewImage', maxCount: 1 }, { name: 'inputDetailImage', maxCount: 10 }]), propertyController.addNewProperty);

module.exports = router;