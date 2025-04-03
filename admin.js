const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const Order = require('../models/Order');
const User = require('../models/User');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.get('/items', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    throw new Error('Failed to fetch items');
  }
});

router.get('/orders', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'username email').populate('items.itemId');
    res.json(orders);
  } catch (error) {
    throw new Error('Failed to fetch orders');
  }
});

router.delete('/orders/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (error) {
    throw new Error('Failed to delete order');
  }
});

module.exports = router;