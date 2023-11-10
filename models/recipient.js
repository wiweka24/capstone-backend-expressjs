const mongoose = require('mongoose')

const RecipientSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  whatsAppNumber: {
    type: String,
    required: true,
    unique: true,
  },
})

module.exports = mongoose.model('Recipient', RecipientSchema)