import { getUserByUsername, createUser } from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import{createSeller} from "../models/seller.model.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password, isSeller } = req.body;
    const hash = bcrypt.hashSync(password, 10); //hash password
    const userId = await createUser({ username, email, password: hash, isSeller });
    if (isSeller) {
      const {  storeName, storeDescription, mainService, serviceDays, serviceArea, serviceType } = req.body;

      // Validate seller information
      if (!storeName || !storeDescription || !mainService || !serviceDays || !serviceArea || !serviceType) {
        return res.status(400).send({ message: "All fields required for seller registration must be provided." });
      }
      // Create seller entry
      await createSeller({
        UserID: userId,
        StoreName: storeName,
        StoreDescription: storeDescription,
        MainService: mainService,
        ServiceDays: serviceDays,
        ServiceArea: serviceArea,
        ServiceType: serviceType
      });
    }

    
    res.status(201).send({ message: "User has been created.", userId });
  } catch (err) {
    next(createError(500, err.message));
  }
};


export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username); // Use the new getUserByUsername function

    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(password.trim(), user.Password.trim());

    if (!isCorrect) {
      console.log('Password mismatch');
      return next(createError(400, "Wrong password or username!"));
    }

    const token = jwt.sign(
      { id: user.UserID, isSeller: user.isSeller }, // Ensure these fields exist in your MySQL user records
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
    const { password: _, ...info } = user; // Destructure to avoid sending password back
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "Strict", // Important for CORS and cookie security
      })
      .status(200)
      .send({user: info,  message: "User logged in"});
  } catch (err) {
    next(createError(500, err.message));
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
