const mongoose = require("mongoose");


const categorySchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    categoryImage:{
        type:String,
        required:true,
    },
    subCategories:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubCategory"
    }]

});

module.exports = mongoose.model('Category', categorySchema);
