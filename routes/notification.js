const { Router } = require('express');
const { getAllRecipients, postNewRecipient, getLastHourNotification } = require('../controllers/notification');
const router = Router();

/*
All route for bin/notification
*/

router
  .route('/recipients')
  .get(getAllRecipients)
  .post(postNewRecipient)

router
  .route('/')
  .get(getLastHourNotification)

module.exports = router;