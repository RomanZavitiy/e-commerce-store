const mongoose = require('mongoose');
const Product = require('../models/product');  // Adjust the path as necessary

mongoose.connect("mongodb://localhost/OS")
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

async function deleteAllProducts() {
  try {
    const result = await Product.deleteMany({});
    console.log(`Deleted ${result.deletedCount} products`);
  } catch (error) {
    console.error('Error deleting products:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
}

deleteAllProducts();