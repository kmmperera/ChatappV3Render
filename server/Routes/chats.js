const express = require('express');
const router = express.Router();

const {getchats } = require('../Controllers/chats');


router.get('/getchats/:id', getchats);

module.exports = router;
