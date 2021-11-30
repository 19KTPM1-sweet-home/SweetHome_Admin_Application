const express = require('express');
const router = express.Router();
const multer = require('multer');

// MULTER SETUP
// SET STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
const upload = multer({ storage: storage });

const propertyController = require('../controllers/propertyController');

router.get('/page/:currentPage', propertyController.loadProperties);
router.post('/add', upload.fields([{ name: 'inputPreviewImage', maxCount: 1 }, { name: 'inputDetailImage', maxCount: 10 }]), propertyController.addNewProperty);

module.exports = router;