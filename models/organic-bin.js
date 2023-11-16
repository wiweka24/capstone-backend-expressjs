const mongoose = require('mongoose')

const OrganicBinSchema = mongoose.Schema({
  level:{
    type: mongoose.Types.Decimal128,
    required: true,
    unique: false,
  },
  temp:{
    type: mongoose.Types.Decimal128,
    required: false,
    unique: false,
  },
  humidity: {
    type: mongoose.Types.Decimal128,
    required: false,
    unique: false,
  },
  timestamp: {
    type: Date,
    required: true,
    unique: false,
  },
  numberOfTrash: {
    type: Number,
    required: true,
    unique: false,
  }
})

OrganicBinSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.level = ret.level ? parseFloat(ret.level.toString()) : null;
    ret.temp = ret.temp ? parseFloat(ret.temp.toString()) : null;
    ret.humidity = ret.humidity ? parseFloat(ret.humidity.toString()) : null;
  }
});

module.exports = mongoose.model('OrganicBin', OrganicBinSchema)