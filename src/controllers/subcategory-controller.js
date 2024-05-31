const { error } = require("console");
const SubCategory = require("../models/subcategory-models");
const mongoose = require('mongoose');
const Category = require("../models/category-model");


exports.saveSubCategory = async (req, res) => {
    try {
      const { subCategoryName, subCategoryImage, categoryId } = req.body;
  
      // Check if the category exists (recommended)
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(400).json({ message: "Category not found" });
      }
  
      // Create a new subcategory
      const newSubCategory = new SubCategory({name: subCategoryName, categoryId:category,subCategoryImage: subCategoryImage });
  
      // Save the subcategory
      const savedSubCategory = await newSubCategory.save();
  
      // Update the parent category's subCategories array (optional)
      category.subCategories.push(savedSubCategory._id);
      await category.save();
  
      // Send successful response
      res.status(201).json({ message: "Subcategory created successfully", subcategory: savedSubCategory });
    } catch (error) {
      console.error(error);
      // Send error response only if no response has been sent already
      if (!res.headersSent) {
        res.status(500).json({ message: "Error creating subcategory" });
      }
    }
  };

exports.getSubCategory = async (req, res) => {
    try {
      const allSubCat = await SubCategory.find(); // Await the query
  
      if (allSubCat.length === 0) { // Check for empty array
        return res.status(404).json({ message: "No categories found" }); // 404 for not found
      }
  
      res.status(200).json({ subcategory: allSubCat });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching categories" });
    }
  };