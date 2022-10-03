const express = require('express');
const { protect } = require('../controllers/authorisationController');
const {
  getOne,
  checkOwner,
  //   getMe,
  getAll,
} = require('../controllers/handlerFactory');
const {
  readNotification,
  setNotificationFilter,
} = require('../controllers/notificationController');
const Notifications = require('../models/notificationModel');

const router = express.Router();

router.use(protect);

router
  .route('/:id')
  .patch(
    checkOwner(Notifications),
    getOne(Notifications, true),
    readNotification
  );

router.route('/').get(setNotificationFilter, getAll(Notifications));

module.exports = router;
