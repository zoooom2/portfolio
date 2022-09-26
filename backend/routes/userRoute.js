const express = require('express');

const {
  getAllUsers,
  // createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  follow,
  unfollow,
  blockUser,
  checkBlock,
} = require('../controllers/userController');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  restrictTo,
  protect,
} = require('../controllers/authorisationController');
const tweetRouter = require('./tweetRoute');

const router = express.Router();

router.use('/:userId/getAllTweets', tweetRouter);
router.use('/:userId/:action', tweetRouter);

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updatePassword', updatePassword);

router.use(protect);

router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);
router.get('/me', getMe, getUser);
router.patch('/:action/:userId', getMe, blockUser);
router.route('/:id').get(checkBlock, getUser);
// router.post('/', createUser);
router.route('/follow/:id').patch(checkBlock, follow);
router.route('/unfollow/:id').patch(checkBlock, unfollow);

router.use(restrictTo('admin'));

router.route('/').get(getAllUsers);

router.route('/:id').patch(updateUser).delete(deleteUser);

module.exports = router;
