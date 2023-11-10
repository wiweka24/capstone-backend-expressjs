const mongoose = require('mongoose')

const NotificationSchema = mongoose.Schema({
  text:{
    type: String,
    required: true,
    unique: false,
  },
  binType:{
    type: String,
    required: true,
    unique: false,
  },
  timestamp: {
    type: Date,
    required: true,
    unique: true,
  }
})

NotificationSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.level = ret.level ? parseFloat(ret.level.toString()) : null;
    ret.temp = ret.temp ? parseFloat(ret.temp.toString()) : null;
  }
});

module.exports = mongoose.model('Notification', NotificationSchema)