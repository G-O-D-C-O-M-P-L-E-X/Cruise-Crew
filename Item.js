const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }, // New field
  image: { type: String, required: true },
  rentPerDay: { type: Number, required: true },
  category: { type: String, enum: ['bike', 'accessory'], required: true },
  stock: { type: Number, default: 10 }
});

module.exports = mongoose.model('Item', itemSchema);