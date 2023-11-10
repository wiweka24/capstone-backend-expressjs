const { Router } = require('express');
const { 
  getAllBins, 
  postNewBin, 
  postNewBinDatas, 
  getBinDatas, 
  getLatestBinDatas, 
  getLimitBinDatas 
} = require('../controllers/bin');
const router = Router();

/*
All route for bin/{route}
*/

router
  .route('/')
  .get(getAllBins)
  .post(postNewBin)
  // .delete(authMid, deleteUser)
  // .patch(authMid, editUser)

router
  .route('/:binName')
  .get(getBinDatas)
  .post(postNewBinDatas)

router
  .route('/:binName/latest')
  .get(getLatestBinDatas)

router
  .route('/:binName/:limit')
  .get(getLimitBinDatas)

// router
//   .route('/sensor')


module.exports = router;