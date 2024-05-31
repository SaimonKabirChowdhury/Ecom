const mongoose = require("mongoose");



const addressSchema = mongoose.Schema({

    placeName:{
        type:String,
        requiried:true,
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    streetAdress:{
        type:String,
        required:true,
    },


});

module.exports = mongoose.model('Address',addressSchema);