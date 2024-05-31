const { error } = require("console");
const Category = require("../models/category-model");
const mongoose = require('mongoose');



exports.saveCategory = async(req,res)=>{

    const{categoryName,categoryImage} = req.body;

 try{
    const newCategory = new Category({name:categoryName,categoryImage:categoryImage});
    const saveCat = await newCategory.save();


    res.status(200).json({ message: "Category created successfully", category: saveCat });
 }catch(error){
    console.error(error);

    res.status(500).json({ message: "Error creating category" });

 }
}

exports.getUserCategory = async (req, res) => {
    try {
        const allCat = await Category.find().populate('subCategories'); // Populate subcategories
  
      if (allCat.length === 0) { // Check for empty array
        return res.status(404).json({ message: "No categories found" }); // 404 for not found
      }
  
      res.status(200).json({ category: allCat });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching categories" });
    }
  };