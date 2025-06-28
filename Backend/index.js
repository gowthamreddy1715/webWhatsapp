const express = require('express');
const axios = require('axios');
require('dotenv').config();
const { sendWhatsAppMessage } = require('./message');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/send', async (req, res) => {
  const { customerName, phoneNumber, orderId } = req.body;

  if (!customerName || !phoneNumber || !orderId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await sendWhatsAppMessage({ customerName, phoneNumber, orderId, total });
    res.status(200).json({ message: 'WhatsApp message sent!' });
  } catch (error) {
    console.error('Error sending WhatsApp message:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
