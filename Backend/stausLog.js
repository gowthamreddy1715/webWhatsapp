const db = require('../config/db');

exports.insertLog = async (messageId, recipient, status, timestamp) => {
  await db.query(
    'INSERT INTO status_logs (message_id, recipient_number, status, timestamp) VALUES (?, ?, ?, ?)',
    [messageId, recipient, status, timestamp]
  );
};
