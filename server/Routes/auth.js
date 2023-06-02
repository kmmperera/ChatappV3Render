const express = require('express');
const router = express.Router();
const { signup, signin,updateuser } = require('../Controllers/auth');
const multer  = require('multer');
//const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({ 
    destination: function(req, file, cb) {cb(null, 'uploads/')},
    filename: function(req, file, cb) {cb(null, Date.now() + '-' + file.originalname)}
});
const upload = multer({storage});

router.post('/signup', signup);
router.post('/signin',signin);
router.post('/updateuser', updateuser);

module.exports = router;