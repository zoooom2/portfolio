const express = require('express');
const { protect } = require('../controllers/authorisationController');
const { checkOwner, getOne, getAll } = require('../controllers/handlerFactory');
const { uploadPhoto, resizePhoto } = require('../controllers/imageHandler');
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
  .post(
    uploadPhoto('images'),
    resizePhoto(2000, 1333, 'messages'),
    createMessage,
    sendNotification
  )
  .delete(deleteMessage)
  .patch(updateMessage)
  .get(checkOwner(Message), getOne(Message, true), readMessage);

router.route('/').get(setMessageFilter, getAll(Message));
module.exports = router;
