const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: Number, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      name: {type: String}
    }
  ]
});

module.exports = mongoose.model('Cart', cartSchema);
