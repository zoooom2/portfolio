const express = require('express');
const {
  createOrUpdateVisitorCount,
  visitorPerTime,
} = require('../controllers/visitorController');

const router = express.Router();

router.post('/', createOrUpdateVisitorCount);
router.get('/visitorpertime', visitorPerTime);

module.exports = router;
