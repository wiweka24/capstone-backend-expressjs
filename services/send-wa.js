const twilio = require('twilio');
require('dotenv').config();

const sendWhatsAppMessage = (whatsAppNumber, msg) => {
  const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
  const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
  const recipient = whatsAppNumber
  const client = new twilio(accountSid, authToken);

  async function sendWhatsAppMessage(to, message) {
    try {
      await client.messages.create({
        body: message,
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${to}`,
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  recipient.forEach(number => {
    sendWhatsAppMessage(number, msg)
  });
};

module.exports = { sendWhatsAppMessage };