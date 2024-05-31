const mongoose = require('mongoose');

const specialOfferSchema = mongoose.Schema({


    offertype:{
        required:true,
        type:String,
        enum:["Image","Video"]
    },
    offerUrl:{
        type:String,
        required:true,
    },

    offerText:{
        type:String
    },
    offerAssignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    offeredDiscount :{
        type:Number,
        default:0
    },
    givenAt:{
        type:Date
    }


});

module.exports = mongoose.model('Offer',specialOfferSchema);