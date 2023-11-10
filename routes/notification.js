const { Router } = require('express');
const { getAllRecipients, postNewRecipient } = require('../controllers/notification');
const router = Router();

/*
All route for bin/notification
*/

router
  .route('/')
  .get(getAllRecipients)
  .post(postNewRecipient)

module.exports = router;