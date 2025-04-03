const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, enum: ['bike', 'accessory'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bike', bikeSchema);