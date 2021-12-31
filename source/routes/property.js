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

router.get('/', propertyController.show);

router.get('/page/:currentPage', propertyController.loadProperties);

router.get('/:id', propertyController.loadProperty);

// upload.fields include name attribute in <img> tags
router.post('/add', upload.fields([{ name: 'inputPreviewImage', maxCount: 1 }, { name: 'inputDetailImage', maxCount: 10 }]), propertyController.addNewProperty);

// delete a property
router.delete('/delete/:id', propertyController.deleteProperty);

// update a property
router.post('/edit/:id',upload.fields([{ name: 'inputPreviewImage', maxCount: 1 }, { name: 'inputDetailImage', maxCount: 10 }]), propertyController.editProperty);

module.exports = router;