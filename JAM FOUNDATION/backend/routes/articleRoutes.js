const express = require('express');
const articleController = require('../controllers/articleController');
const authController = require('../controllers/authControllers');

const router = express.Router();
const {
  getAllArticles,
  getArticle,
  updateArticle,
  uploadArticle,
  deleteArticle,
} = articleController;

const { protect } = authController;

router.route('/').get(getAllArticles);
router.route('/:id').get(getArticle);

router.use(protect);

router.route('/').post(uploadArticle);
router.route('/:id').delete(deleteArticle).patch(updateArticle);

module.exports = router;
