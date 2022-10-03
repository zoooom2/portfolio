const express = require('express');

const {
  getAllUsers,
  // createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,

  follow,
  blockUser,
  checkBlock,
  addCircle,
  uploadPhoto,
  resizePhoto,
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
const { sendNotification } = require('../controllers/notificationController');
const { getMe } = require('../controllers/handlerFactory');
const { likeTweet, retweet } = require('../controllers/tweetController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updatePassword', updatePassword);

router.use(protect);

// router.patch('/updateMe', updateMe);
// router.delete('/deleteMe', deleteMe);
// router.get('/me', getMe, getUser);

router
  .route('/me')
  .get(getMe, getUser)
  .delete(deleteMe)
  .patch(uploadPhoto, resizePhoto, updateMe);

router.route('/:id').get(checkBlock, getUser);
// router.post('/', createUser);
router.route('/circle/:id').patch(addCircle);
router.route('/follow/:id').patch(checkBlock, follow, sendNotification);
router.patch('/block/:id', blockUser);
router.use('/get-tweets/:userId', tweetRouter);
// router.use('/like', tweetRouter);
// router.use('/retweet', tweetRouter);
router.patch('/like/:id', likeTweet, sendNotification);
router.patch('/retweet/:id', retweet, sendNotification);

router.use(restrictTo('admin'));

router.route('/').get(getAllUsers);

router.route('/:id').patch(updateUser).delete(deleteUser);

module.exports = router;
