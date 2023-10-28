const mongoose = require('mongoose')
const { sign } = require("jsonwebtoken");

const BinDataSchema = mongoose.Schema({
  binRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bin'
  },
  organicLevel:{
    type: mongoose.Types.Decimal128,
    required: true,
    unique: false,
  },
  organicTemp:{
    type: mongoose.Types.Decimal128,
    required: false,
    unique: false,
  },
  plasticLevel:{
    type: mongoose.Types.Decimal128,
    required: true,
    unique: false,
  },
  plasticTemp:{
    type: mongoose.Types.Decimal128,
    required: false,
    unique: false,
  },
  paperLevel:{
    type: mongoose.Types.Decimal128,
    required: true,
    unique: false,
  },
  paperTemp:{
    type: mongoose.Types.Decimal128,
    required: false,
    unique: false,
  }
})

module.exports = mongoose.model('BinData', BinDataSchema)