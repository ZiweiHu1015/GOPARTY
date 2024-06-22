//this file is a middle point that handles http requests from user and invoke model operations in models folder. 
import { createUser as modelCreateUser, getUserById, deleteUserById, updateUserById } from "../models/user.model.js";
import createError from "../utils/createError.js";

export const getUser = async (req, res, next) => {
  try {
      const user = await getUserById(req.params.id);
     
      if (!user) {
          return next(createError(404, "User not found"));
      }
      res.status(200).send(user);
  } catch (error) {
      next(createError(500, "Server error"));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
      const user = await getUserById(req.params.id);
      
      if (!user) {
          return next(createError(404, "User not found"));
      }

      if (req.userId !== user.UserID) {
        return next(createError(403, "You can delete only your account!"));
      }

      const result = await deleteUserById(req.params.id);
      if (result === 0) {
          return next(createError(404, "User not found"));
      }

      res.status(200).send("User deleted successfully");
  } catch (error) {
      next(createError(500, "Server error"));
  }
};

export const updateUser = async (req, res, next) => {
  try {
      const { username, email, location } = req.body; // Assuming these are the fields you allow to update
      const result = await updateUserById(req.params.id, { username, email, location });
      if (result === 0) {
          return next(createError(404, "User not found"));
      }

      res.status(200).send("User updated successfully");
  } catch (error) {
      next(createError(500, "Server error"));
  }
};
