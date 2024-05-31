const mongoose = require('mongoose');



const messageSchema = mongoose.Schema({

    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    message:{
        type:String
    },
    date:{
        type:String
    }
});

module.exports = mongoose.model('Messages',messageSchema);