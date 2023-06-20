const express = require('express');
const {
  createOrUpdateVisitorCount,
  visitorPerTime,
  pctChangeVisitor,
} = require('../controllers/visitorController');

const router = express.Router();

router.patch('/', createOrUpdateVisitorCount);
router.get('/visitorpertime', visitorPerTime);
router.get('/pctchange', pctChangeVisitor);

module.exports = router;
