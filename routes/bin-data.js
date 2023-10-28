const { Router } = require('express');
const { postNewBinDatas } = require('../controllers/bin');

const router = Router();
// const { authMid } = require('../middleware/authMiddleware')

/*
All route for bin/data
*/

router
  .route('/')
  // .get(getAllBins)
  // .post(postNewBinDatas)
  // .delete(authMid, deleteUser)
  // .patch(authMid, editUser)

module.exports = router;