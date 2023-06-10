const express = require('express');
const { sendContact } = require('../controllers/phpMailController');

const router = express.Router();

router.get('/', sendContact);

module.exports = router;
