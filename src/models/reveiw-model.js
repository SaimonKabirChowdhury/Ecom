const mongoose = require("mongoose");
const { type } = require("os");


const reveiewSchema = mongoose.Schema({

    rating:{
        type:Number,
    },
    reveiwText:{
        type:String,
        required:true
    },

    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    givenBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }




});

module.exports = mongoose.model("Reveiw",reveiewSchema);