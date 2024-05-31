const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    orderedProduct:[
   {
    product:{
        type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required:true

        },
     quantity:{
        type:Number,
     required:true  
    }, 
   }
        
        
        
        
        ],


    amount: {
        type: Number,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    confirmDate: {
        type: Date,
        default: null
    },
    deliveredDate: {
        type: Date,
        default: null
    },
    returnDate: {
        type: Date,
        default: null
    },
    shopDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor"
    },
    userDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    orderStatus: {
        type: String,
        required:true,
        enum: ['Pending', 'Completed', 'Delivered']
    }
});

module.exports = mongoose.model('Order', orderSchema);
