const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    subCategoryImage:{
      type:String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category' // Reference back to the Category schema
    },
    products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'  // Reference to the Product schema
    }]
  });
  
  module.exports = mongoose.model('SubCategory', subcategorySchema);
  