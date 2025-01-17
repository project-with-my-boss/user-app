import mongoose from "mongoose";
import User from "../models/user.model.js";


export const getUsers = async (req, res) => {
   const users = await User.find()
   try {
     return res.status(200).json({status:true, data: users, message: "Users fetched successfully"});
   } catch (error) {
    return res.status(500).json({status:false, message: error.message});
   }
}


export const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id)

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

   try {
     return res.status(200).json({status:true, data: user, message: "Users fetched successfully"});
   } catch (error) {
    return res.status(500).json({status:false, message: error.message});
   }
}


export const createUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Please provide name and email" });
  }

  try {
    const newUser =  new User({name, email})
    await newUser.save();
    return res.status(201).json({status:true, data: newUser, message: "User created successfully"});
  } catch (error) {
    return res.status(500).json({status:false, message: error.message});
  }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({status:false, message:"Invalid id"});
    }

    if(!name || !email) {
        return res.status(400).json({status:false, message:"Please provide all the required fields"});
    }

    try {
        const updatedUser = await User.findByIdAndUpdate({_id: id}, {name, email}, {new: true})
        res.status(201).json({status:true, data: updatedUser, message:"User updated successfully"});
    } catch (error) {
        res.status(500).json({status:false, message:"Error updating product"});

    }
    

}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

try {
      const deletedUser = await User.findByIdAndDelete({_id: id});
       res.status(200).json({status:true, data: deletedUser, message:"User deleted successfully"});
      } catch (error) {
        console.log(error);
        res.status(500).json({status:false, message:"Error deleting user"});
        
      }  

}