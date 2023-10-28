const mongoose = require('mongoose')

const PlasticBinSchema = mongoose.Schema({ 
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
  }
})

PlasticBinSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.level = ret.level ? parseFloat(ret.level.toString()) : null;
    ret.temp = ret.temp ? parseFloat(ret.temp.toString()) : null;
  }
});

module.exports = mongoose.model('PlasticBin', PlasticBinSchema)