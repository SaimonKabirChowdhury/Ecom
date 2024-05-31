const mongoose = require('mongoose');
const OrderSchema = require('../models/order-model');




exports.createOrder = async (req,res) =>{

    
  
    console.log(req.body)
    const newOrder = new OrderSchema({
     orderNumber:req.body.orderNumber,
     quantity:req.body.totalQuantity,
     orderedProduct:req.body.orderedProduct,
     amount:req.body.amount,
     createdDate:req.body.createdDate,
     confirmDate:null,
     deliveredDate:null,
     returnDate:null,
     shopDetails:req.body.shopDetails,
     userDetails:req.body.userDetails,
     orderStatus:req.body.status,

    });

    const saveOrder = await newOrder.save();
    if(saveOrder){
        res.status(200).json({message:"Order Placed Succesfully",newOrder});
    }
    else{
        res.status(500).json({message:"Error PLacing order"});

    }
}



exports.getOrderById = async (req, res) => {
    try {
        const order = await OrderSchema.findById(req.params.orderid)
            .populate({
                path: 'shopDetails',
                select: 'username shopAddress name phoneNumber'
            })
            .populate({
                path: 'userDetails',
                select: 'name unique_phone_number'
            })
            .populate({
                path: 'orderedProduct.product',
                // Include the fields you need
            })
            .exec();

        if (order) {
            res.status(200).json({ message: "Order details", order });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getActiveOrder = async (req, res) => {
    console.log(req.body); // For debugging purposes
  
    try {
      const activeOrder = await OrderSchema.findOne({
        // Assuming `status` is an enum
    $and: [
    { userDetails: req.params.userid },
    { $or: [ { orderStatus: "Pending" }, { orderStatus: "Delivered" } ] }
  ]

    })
        .populate('shopDetails')
        .populate({
          path: 'orderedProduct.product',
        });
  
      if (activeOrder) {
        res.status(200).json({ message: "Order details", order: activeOrder });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      console.error(error); // Log the error for troubleshooting
      res.status(500).json({ message: "Internal server error" }); // Send a generic error message to the client
    }
  };
  
exports.getPendingeOrder = async (req, res) => {
    console.log(req.body); // For debugging purposes
  
    try {
      const activeOrder = await OrderSchema.findOne({
        // Assuming `status` is an enum
        $and: [
            { userDetails: req.params.userid },
            { orderStatus: "Pending" }
        ]

    })
        .populate('shopDetails')
        .populate({
          path: 'orderedProduct.product',
          select: 'name mainImageUrl rating price description hasDiscount discountPercent stockQuantity', // Include desired fields
        });
  
      if (activeOrder) {
        res.status(200).json({ message: "Order details", order: activeOrder });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      console.error(error); // Log the error for troubleshooting
      res.status(500).json({ message: "Internal server error" }); // Send a generic error message to the client
    }
  };

exports.getCompletedOrder = async (req, res) => {
    console.log(req.body); // For debugging purposes
  
    try {
      const activeOrder = await OrderSchema.find({
        // Assuming `status` is an enum
        $and: [
            { userDetails: req.params.userid },
            { orderStatus: "Completed" }
        ]

    })
        .populate('shopDetails')
        .populate({
          path: 'orderedProduct.product',
        });
  
      if (activeOrder) {
        res.status(200).json({ message: "Order details", order: activeOrder });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      console.error(error); // Log the error for troubleshooting
      res.status(500).json({ message: "Internal server error" }); // Send a generic error message to the client
    }
  };  
    