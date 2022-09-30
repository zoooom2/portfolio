const express = require('express');
const { protect } = require('../controllers/authorisationController');
const { checkOwner, getOne, getAll } = require('../controllers/handlerFactory');
const {
  createMessage,
  deleteMessage,
  updateMessage,
  readMessage,
  setMessageFilter,
} = require('../controllers/messageController');
const { sendNotification } = require('../controllers/notificationController');
const Message = require('../models/messageModel');

const router = express.Router();

router.use(protect);
router
  .route('/:id')
  .post(createMessage, sendNotification)
  .delete(deleteMessage)
  .patch(updateMessage)
  .get(checkOwner(Message), getOne(Message, true), readMessage);

router.route('/').get(setMessageFilter, getAll(Message));
module.exports = router;
