const mongoose = require("mongoose");
const Review = require('../models/reveiw-model');



exports.addReveiw = async (req,res) =>{

    if(req.body.productId == null){
        res.status(500).json({message:"Product not found"});
    }
    const reveiw = new Review ({givenBy:req.body.givenBy,productId:req.body.productId,reveiwText:req.body.reveiwText,rating:req.body.rating});

    
try {

    const newRev = await reveiw.save();
    res.status(200).json({messgae:"Reveiw given Succesfully"});
    
} catch (error) {

        res.status(500).json({messgae:"An error happend ,"+error});

}

}

exports.getReview = async (req, res) => {
    try {
      const reviews = await Review.find({ productId: req.params.productId }).populate("givenBy");
      if (reviews.length === 0) {
        return res.status(404).json({ message: "No Review found" });
      }
      res.status(200).json({ reviews: reviews });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


