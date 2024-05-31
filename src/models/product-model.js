const mongoose = require('mongoose');
const { type } = require('os');

const productSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  mainImageUrl:{
    type:String,
    required:true
  },
  rating:{
    type:String,
  },
  itemSold:{
    type:String,
  },
  price:{
    type:Number,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  hasDiscount:{
    type:Boolean,
    required:true,
  },
  discountPercent:{
    type:Number
  },
  discounImageUrl:{
    type:String
  },

  stockQuantity:{
    type:Number,
  },
  otheImages:[{
    type:String
  }],

  subcategoryId :{
    type:mongoose.Schema.Types.ObjectId,
    ref:"SubCategory",
  },
  reveiws:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Reveiws"
  }],
  productType:{
    type:String,
    required:true
  }



});

module.exports = mongoose.model('Product', productSchema);
