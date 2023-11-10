const Recipient = require('../models/recipient')

exports.postNewRecipient = async (req, res, next) => {
  try {
    const recipient = new Recipient({
      ...req.body,
    })

    const savedRecipient = await recipient.save()
    
    res
      .status(201)
      .json({ savedRecipient })

  } catch (err) {
    next(err)
  }
}

exports.getAllRecipients = async (req, res, next) => {
  try {
    const recipient = await Recipient.find()
    
    res
    .status(200)
    .json(recipient)

  } catch (err) {
    next(err)
  }
}