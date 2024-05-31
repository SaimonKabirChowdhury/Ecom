const Product = require("../models/product-model");

const SubCategory = require("../models/subcategory-models");
const mongoose = require('mongoose');


exports.saveProduct = async (req,res) =>{
    const newProd = new Product({
        name:req.body.name,
        description:req.body.description,
        hasDiscount:req.body.hasDiscount,
        subcategoryId:req.body.subcategoryId,
        mainImageUrl:req.body.mainImageUrl,
        otheImages:req.body.otherImages,
        price:req.body.price,
        });
    

        const subcategory = await SubCategory.findById(req.body.subcategoryId);
        if (!subcategory) {
          return res.status(400).json({ message: "Sub Category not found" });
        }


        try {
            const saveProduct = await  newProd.save();
            
            subcategory.products.push(saveProduct._id);
            await subcategory.save();
            res.status(200).json({ message: "Product Inserted successfully", product: saveProduct });
          
            
        } catch (error) {
            console.error(error);

            res.status(500).json({ message: "Error inserting product" });
            
        }
   
        
}

exports.getProduct = async(req,res) =>{

    try {
        const product = await Product.find();

        res.status(200).json({ product: product });


    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching products" });
    } 

}


exports.getProductBySubCategory = async (req, res) => {
    try {
      const products = await Product.find({ subcategoryId: req.params.subcategoryId });
      if (products.length === 0) {
        return res.status(404).json({ message: "No Products found" });
      }
      res.status(200).json({ products: products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
