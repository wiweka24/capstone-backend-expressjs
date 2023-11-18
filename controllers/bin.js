const Bin = require('../models/bin');
const organicBin = require('../models/organic-bin');
const plasticBin = require('../models/plastic-bin');
const paperBin = require('../models/paper-bin');
const notification = require('../models/notification');
const Recipient = require('../models/recipient');
const { sendEmail } = require('../services/send-email');
const { sendWhatsAppMessage } = require('../services/send-wa');

/*
  @desc  Get All Bin from Database
  @route api/bin/
*/
exports.getAllBins = async (req, res, next) => {
  try {
    const bin = await Bin
      .find()
      .populate([
        { path: "organicData", model: organicBin }, 
        { path: "plasticData", model: plasticBin }, 
        { path: "paperData", model: paperBin }
      ])
    
      res
      .status(200)
      .json(bin)

  } catch (err) {
    next(err)
  }
}

/*
  @desc  Post New Bin to Database
  @route api/bin/
*/
exports.postNewBin = async (req, res, next) => {
  try {
    const bin = new Bin({
      ...req.body,
    })

    const savedBin = await bin.save()
    
    res
      .status(201)
      .json({ savedBin })

  } catch (err) {
    next(err)
  }
}

/*
  @desc  Get All Bin Datas from Database
  @route api/bin/:binName
*/
exports.getBinDatas = async (req, res, next) => {
  try {
    const bin = await Bin
      .findOne({ binName : req.params.binName })
      .populate([
        { path: "organicData", model: organicBin }, 
        { path: "plasticData", model: plasticBin }, 
        { path: "paperData", model: paperBin }
      ])

    res
      .status(200)
      .json(bin)

  } catch (err) {
    next(err)
  }
}

/*
  @desc  Get Bin Datas from Database with Limit 
  @route api/bin/:binName/:limit
*/
exports.getLimitBinDatas = async (req, res, next) => {
  try {
    const bin = await Bin
      .findOne({ binName : req.params.binName })
      .populate([
        { path: "organicData", model: organicBin }, 
        { path: "plasticData", model: plasticBin }, 
        { path: "paperData", model: paperBin }
      ])

    const organicData = bin.organicData.slice(-req.params.limit);
    const plasticData = bin.plasticData.slice(-req.params.limit);
    const paperData = bin.paperData.slice(-req.params.limit);

    res
      .status(200)
      .json({ organicData, plasticData, paperData })
      
  } catch (err) {
    next(err)
  }
}

/*
  @desc  Get Latest Bin Datas from Database
  @route api/bin/:binName/latest
*/
exports.getLatestBinDatas = async (req, res, next) => {
  try {
    const bin = await Bin
      .findOne({ binName : req.params.binName })
      .populate([
        { path: "organicData", model: organicBin }, 
        { path: "plasticData", model: plasticBin }, 
        { path: "paperData", model: paperBin }
      ])

    const organicData = bin.organicData[bin.organicData.length - 1];
    const plasticData = bin.plasticData[bin.plasticData.length - 1];
    const paperData = bin.paperData[bin.paperData.length - 1];

    res
      .status(200)
      .json({ organicData, plasticData, paperData })
      
  } catch (err) {
    next(err)
  }
}

/*
  @desc  Post New Bin to Database
  @route api/bin/:binName
*/
exports.postNewBinDatas = async (req, res, next) => {
  try {
    const { organicLevel, organicTemp, organicHumid, plasticLevel, plasticTemp, paperLevel, paperTemp, trashCount } = req.body;
    const currentTime = new Date().getTime();

    // Create the bin data objects
    const [savedOrganicBin, savedPlasticBin, savedPaperBin] = await Promise.all([
      new organicBin({ level: organicLevel, temp: organicTemp, humidity: organicHumid, timestamp: currentTime, numberOfTrash: trashCount }).save(),
      new plasticBin({ level: plasticLevel, temp: plasticTemp, timestamp: currentTime, numberOfTrash: trashCount }).save(),
      new paperBin({ level: paperLevel, temp: paperTemp, timestamp: currentTime, numberOfTrash: trashCount }).save()
    ]);

    // Update the main bin document
    const updatedBin = await Bin.updateOne(
      { binName: req.params.binName },
      {
        $push: {
          organicData: savedOrganicBin._id,
          plasticData: savedPlasticBin._id,
          paperData: savedPaperBin._id
        }
      }
    );

    const recipient = await Recipient.find()
    const email = recipient.map((recipient) => recipient.email)
    const whatsAppNumber = recipient.map((recipient) => recipient.whatsAppNumber)

    // Create Notification if bin is full
    if (organicLevel >= 90) {
      const message = `Tempah Sampah Organik ${req.params.binName} penuh, Mohon Diambil`;
      await new notification({ text: message, binType: "organic", timestamp: currentTime }).save();
      sendEmail(email, message)
      sendWhatsAppMessage(whatsAppNumber, message)
    } 

    if (plasticLevel >= 90) { 
      const message = `Tempah Sampah Plastik ${req.params.binName} penuh, Mohon Diambil`;
      await new notification({ text: message, binType: "plastic", timestamp: currentTime }).save();
      sendEmail(email, message)
      sendWhatsAppMessage(whatsAppNumber, message)
    } 
    
    if (paperLevel >= 90) { 
      const message = `Tempah Sampah Kertas ${req.params.binName} penuh, Mohon Diambil`;
      await new notification({ text: message, binType: "paper", timestamp: currentTime }).save();
      sendEmail(email, message)
      sendWhatsAppMessage(whatsAppNumber, message)
    }

    if (organicTemp >= 40 || organicHumid >= 80) { 
      const message = `Tempah Sampah Organik ${req.params.binName} sudah mulai membusuk, Mohon Diambil`;
      await new notification({ text: message, binType: "organic", timestamp: currentTime }).save();
      sendEmail(email, message)
      sendWhatsAppMessage(whatsAppNumber, message)
    }

    res
      .status(201)
      .json({ savedBinDatas: [savedOrganicBin, savedPlasticBin, savedPaperBin], updatedBin });

    } catch (err) {
    next(err);
  }
}