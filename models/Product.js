const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);
