const mongoose = require('mongoose')

const PaperBinSchema = mongoose.Schema({
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

PaperBinSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.level = ret.level ? parseFloat(ret.level.toString()) : null;
    ret.temp = ret.temp ? parseFloat(ret.temp.toString()) : null;
  }
});

module.exports = mongoose.model('PaperBin', PaperBinSchema)