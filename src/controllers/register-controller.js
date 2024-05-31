const mongoose = require('mongoose');
const User = require('../models/user-model');

exports.registerUser = async (req, res) => {

    const regex = /^\+88/;
    if (req.body.unique_phone_number.toString().length !== 14) {
        return res.status(400).json({ error: 'Phone Number must be 14 Character including +88' });
      }
    else if(typeof req.body.unique_phone_number !== 'string'){
        return res.status(409).json({ error: 'Entered phone number is not a number' });
    } 
    else if(!regex.test(req.body.unique_phone_number)){
        return res.status(409).json({ error: 'Entered phone number must be a bangaldeshi number' });
    } 

    if (req.body.unique_nid_number.toString().length !== 10) {
        return res.status(400).json({ error: 'Nid Number length must be 10' });
      }
    else if(typeof req.body.unique_nid_number !== 'number'){
        return res.status(409).json({ error: 'Nid Number is not number' });
    }  
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ message: 'User created successfully!', user: newUser });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      // Handle duplicate errors more concisely
      const { errors } = error; // Destructure errors object
      if (errors.unique_nid_number?.kind === 'unique') {
        return res.status(409).json({ error: 'Nid Number Already registered' });
      } else if (errors.unique_phone_number?.kind === 'unique') {
        return res.status(409).json({ error: 'Phone Number Already registered' });
      }
    } else if (error.code === 11000 && error.keyPattern?.unique_phone_number) { // Handle duplicate phone number error (alternative approach)
      return res.status(409).json({ error: 'Phone Number Already registered' });
    }else if(error.code === 11000 && error.keyPattern?.unique_nid_number){
        return res.status(409).json({ error: 'Nid Number Already registered' });

    }
   
    console.error(error);
    return res.status(error.statusCode || 500).json({ error: 'An error occurred during registration.' });
  }
};
