const Recipient = require('../models/recipient')
const Notification = require('../models/notification')

exports.getLastHourNotification = async (req, res, next) => {
  try {
    const notifications = await Notification.find({
      timestamp: {
        $gte: new Date(new Date() - 60 * 60 * 1000)
      }
    });

    res
      .status(201)
      .json(notifications);
      
  } catch (err) {
    next(err);
  }
};

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