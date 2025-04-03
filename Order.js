const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    quantity: { type: Number, required: true },
    rentPerDay: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['Processing', 'Delivered'], default: 'Processing' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);