const mongoose = require('mongoose');
const { INT24 } = require('mysql/lib/protocol/constants/types');
const { type } = require('os');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    unique_phone_number:{
        type:String,
        required:true,
        unique:true
    },
    unique_nid_number:{
        type:Number,
        required:true,
        unique:true,
       
    },
    password:{
        type:String,
        required:true,
    },
    
    imageUrl:{
        type:String
    },
    rating:{
        type:Number,
        default:0.0
    },
    specialOffer:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Offer"
    }],
    fcmToken:{
        type:String,
    },
    playerId:{
        type:String
    },
    location:{
        type:String
    },
    profession:{
        type:String,
        default:null
    },
    nidUrl:{
        frontUrl:{
            type:String
        },
        backUrl:{
            type:String
        }
    },
    pictureGiven: { type: Boolean, default: false },
    nidVerified: { type: Boolean, default: false },
    addressAdded: { type: Boolean, default: false },
    professionAdded: { type: Boolean, default: false },
    numberAdded: { type: Boolean, default: true }


});

module.exports = mongoose.model('User',userSchema);