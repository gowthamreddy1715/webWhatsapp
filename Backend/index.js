const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors'); 
const db = require('./db')

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and form data

app.use(cors({
  origin: '*', // your React app URL
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/send', async (req, res) => {
  const { customerName, phoneNumber, orderId } = req.body;

  if (!customerName || !phoneNumber || !orderId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const message = `Hello ${customerName}, your order ${orderId} is ready! 📦`;
    const link = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    const insertQuery = 'INSERT INTO orders (customerName, phoneNumber, orderId) VALUES (?, ?, ?)';
    db.query(insertQuery, [customerName, phoneNumber, orderId], (err, results) => {
      if (err) {
        console.error('MySQL Insert Error:', err.message);
        return res.status(500).json({ message: 'Database insert error' });
      }

      return res.status(200).json({ link });
    });

  }catch (error) {
    console.error('Error sending WhatsApp message:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
