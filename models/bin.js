const mongoose = require('mongoose')

const BinSchema = mongoose.Schema({
  binName: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
    unique: false,
  },
  organicData: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrganicBin',
  }],
  plasticData: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlasticBin',
  }],
  paperData: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaperBin',
  }],
})

module.exports = mongoose.model('Bin', BinSchema)