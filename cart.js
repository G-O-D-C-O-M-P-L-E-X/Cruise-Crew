const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.itemId');
    res.json(cart || { userId: req.user.id, items: [] });
  } catch (error) {
    throw new Error('Failed to fetch cart');
  }
});

router.post('/', authMiddleware, async (req, res) => {
  console.log("hitted cart");
  const { itemId, quantity } = req.body;

  console.log(itemId, quantity, "this is from cart route");
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) cart = new Cart({ userId: req.user.id, items: [] });

    const itemIndex = cart.items.findIndex(i => i.itemId.toString() === itemId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      cart.items.push({ itemId, quantity: quantity || 1 });
    }
    await cart.save();
    await cart.populate('items.itemId');
    res.json(cart);
  } catch (error) {
    throw new Error('Failed to add to cart');
  }
});

module.exports = router;