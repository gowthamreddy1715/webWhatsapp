const axios = require('axios');

async function sendWhatsAppMessage({ customerName, phoneNumber, orderId, total }) {
  const message = `Hi ${customerName}, thanks for your order #${orderId}! Total: ${total}. We'll notify you when it ships.`;

  const url = `${process.env.WHATSAPP_API_URL}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

  const data = {
    messaging_product: 'whatsapp',
    to: phoneNumber,
    type: 'text',
    text: { body: message },
  };

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.post(url, data, config);
  console.log('WhatsApp message sent:', response.data);
  return response.data;
}

module.exports = { sendWhatsAppMessage };
