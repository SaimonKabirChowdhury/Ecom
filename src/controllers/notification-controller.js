const mongoose = require('mongoose');
const Notification = require('../models/notification-model');



exports.getNotification= async(req,res) =>{

try {
    const notification = await Notification.find({notificationSentTo:req.params.userid});

    if(notification){
        res.status(200).json({notification});
    }else{
        res.status(500).json({message:"No notification found"});

    }

} catch (error) {
    res.status(500).json({message:"An error happened"});

}




}