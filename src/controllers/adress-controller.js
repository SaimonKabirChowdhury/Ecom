const mongoose = require('mongoose');
const AdressModel = require('../models/adress-models');
const User = require('../models/user-model');



exports.insertAdress = async (req, res) => {
    const newAdress = new AdressModel({
      placeName: req.body.placeName,
      userId: req.body.userId,
      streetAdress: req.body.streetAdress,
    });
  
    try {
      // Check if user exists
      const user = await User.findById(req.body.userId);
      if (!user) {
        return res.status(404).json({ message: "Error: User not found" });
      }
      //Check if address already exist
      const addresses = await AdressModel.find({userId:req.body.userId});
      const duplicateAddress = addresses.find(address => address.placeName === req.body.placeName || address.streetAdress == req.body.streetAdress );

      if(duplicateAddress){
        return res.status(500).json({ message: "Error: Place name already exist" });
      }

      // Save the address
      const savedAdress = await newAdress.save();
      res.status(200).json({ message: "Address saved for user", userId: req.body.userId, address: savedAdress });
  
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).json({ message: "An error occurred", error: error.message });
    }
};


exports.getAddressByUserId = async (req, res) => {
    try {
      // Find addresses by user ID
      const addresses = await AdressModel.find({ userId: req.params.userId });
    
      if (addresses.length === 0) {
        return res.status(404).json({ message: "No addresses found" });
      } else {
        return res.status(200).json({ addresses: addresses });
      }
  
    } catch (error) {
      console.error("An error occurred:", error);
      return res.status(500).json({ message: "An error occurred", error: error.message });
    }
  };