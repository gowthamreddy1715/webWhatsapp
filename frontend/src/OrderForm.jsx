import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

function OrderForm() {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    orderId: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Hello ${formData.customerName}, your order ${formData.orderId} is ready! 📦`;
    const link = `https://api.whatsapp.com/send?phone=${formData.phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(link, '_blank');
  };

  return (
    <motion.div
      className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-50 to-yellow-100 text-black px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-md border border-gray-200"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
      >
        <h2 className="text-3xl font-extrabold text-green-700 text-center mb-6">
          Send WhatsApp Notification
        </h2>

        <div className="space-y-5 text-gray-800">
          <div>
            <label className="block text-sm font-semibold text-green-800 mb-1">
              Customer Name
            </label>
            <input
              type="text"
              name="customerName"
              placeholder="Enter full name"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-green-200 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-green-800 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="With country code"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-green-200 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-green-800 mb-1">
              Order ID
            </label>
            <input
              type="text"
              name="orderId"
              placeholder="Order number"
              value={formData.orderId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-green-200 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-medium rounded-xl shadow-md hover:from-green-500 hover:to-green-700 transition-all"
        >
          <PaperAirplaneIcon className="h-5 w-5 rotate-45" />
          Send WhatsApp Message
        </motion.button>
      </motion.form>
    </motion.div>
  );
}

export default OrderForm;
