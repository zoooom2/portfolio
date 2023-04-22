const express = require('express');
const {
  createOrUpdateVisitorCount,
  visitorPerTime,
  pctChangeVisitor,
} = require('../controllers/visitorController');

const router = express.Router();

router.post('/', createOrUpdateVisitorCount);
router.get('/visitorpertime', visitorPerTime);
router.get('/pctchange', pctChangeVisitor);

module.exports = router;
