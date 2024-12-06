// routes/cart.js
const express = require('express');
const Cart = require('../models/Cart');
const { authenticateUser } = require('../middlewares/auth');

const router = express.Router();

// cart
router.get('/', authenticateUser, async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.findOne({ userId });
  res.status(200).json(cart ? cart.items : []);
});

// add to cart
router.post('/', authenticateUser, async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity, name } = req.body;

  let cart = await Cart.findOne({ userId });
  if (!cart) cart = new Cart({ userId, items: [] });

  const itemIndex = cart.items.findIndex(item => item.productId === productId);
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity;
  } else {
    cart.items.push({ productId, quantity, name });
  }

  await cart.save();
  res.status(201).json({ message: 'Product added to cart' });
});

// delete from cart
router.delete('/:productId', authenticateUser, async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  const cart = await Cart.findOne({ userId });
  if (cart) {
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
  }

  res.status(200).json({ message: 'Product removed from cart' });
});

module.exports = router;
