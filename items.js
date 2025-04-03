const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log("hitted")
    const items = await Item.find();
    console.log("this is item", items);
    res.status(201).json(items);
  } catch (error) {
    throw new Error('Failed to fetch items');
  }
});

router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const { name, description, image, rentPerDay, category, stock } = req.body;
  try {
    const item = new Item({ name, description, image, rentPerDay, category, stock });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    throw new Error('Failed to add item');
  }
});

router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    throw new Error('Failed to update item');
  }
});

router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (error) {
    throw new Error('Failed to delete item');
  }
});

module.exports = router;