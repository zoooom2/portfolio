const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authControllers');

const router = express.Router();
const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
  restrictTo,
} = authController;
const {
  getMe,
  getUser,
  updateMe,
  deleteMe,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = userController;

const { uploadPhoto } = require('../controllers/imageHandler');

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// Protect all routes after this middleware
router.use(protect);
router.get('/me', getMe, getUser);
router.patch('/updateMyPassword', updatePassword);
router.patch('/updateMe', uploadPhoto([], 'user'), updateMe);
router.delete('/deleteMe', deleteMe);

router.use(restrictTo('master'));

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
