const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs-extra');

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, callback) => {
//       let type = 'property';
//       let path = `./uploads/${type}`;
//       fs.mkdirsSync(path);
//       callback(null, path);
//     },
//     filename: (req, file, callback) => {
//       //originalname is the uploaded file's name with extn
//       callback(null, file.originalname);
//     }
//   })
// });

const maxfileSize = 20000000 // 20MB
const storage = multer.memoryStorage()
const upload = multer({ 
  storage: storage,
  limits: { fileSize: maxfileSize }
});
// // MULTER SETUP
// // SET STORAGE
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public/images/property')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
//   })
   
// const upload = multer({ storage: storage });

const propertyController = require('../controllers/propertyController');

router.get('/page/:currentPage', propertyController.loadProperties);
router.post('/add', upload.fields([{ name: 'inputPreviewImage', maxCount: 1 }, { name: 'inputDetailImage', maxCount: 10 }]), propertyController.addNewProperty);

module.exports = router;