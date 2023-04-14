const express = require('express');
const {
  createOrUpdateVisitorCount,
} = require('../controllers/visitorController');

const router = express.Router();

router.post('/visitorCount', createOrUpdateVisitorCount);
