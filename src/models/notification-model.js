const mongoose = require('mongoose');



const notificationSchema = mongoose.Schema({

    notificationHeading:{
        type:String,
    },
    notificationDescription:{
        type:String,
    },
    notificationType:{
        type:String,
        enum:['Offer','Message','Order' ]
    },
    notificationDate:{
        type:Date,
        default:null
    },
    notificationSentTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }


});


module.exports = mongoose.model('Notification',notificationSchema);
