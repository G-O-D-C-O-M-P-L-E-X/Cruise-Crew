const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('items.itemId');
    res.json(orders);
  } catch (error) {
    throw new Error('Failed to fetch orders');
  }
});

router.post('/checkout', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.itemId');
    if (!cart || !cart.items.length) return res.status(400).json({ message: 'Cart is empty' });

    const total = cart.items.reduce((sum, i) => sum + i.itemId.rentPerDay * i.quantity, 0);
    const order = new Order({
      userId: req.user.id,
      items: cart.items.map(i => ({
        itemId: i.itemId._id,
        quantity: i.quantity,
        rentPerDay: i.itemId.rentPerDay
      })),
      total
    });
    await order.save();

    await Cart.deleteOne({ userId: req.user.id });
    res.status(201).json(order);
  } catch (error) {
    throw new Error('Checkout failed');
  }
});

module.exports = router;