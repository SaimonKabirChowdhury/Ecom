const mongoose = require('mongoose');


const vendoSchema = mongoose.Schema({

    username:{
        type:String,
        required:true
    },

    shopAddress:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true,
    }


});

module.exports = mongoose.model('Vendor',vendoSchema);