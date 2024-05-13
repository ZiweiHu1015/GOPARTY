/*import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: false },
  lastname: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile_img: { type: String, required: false },
  location: { type: String, required: false },
  phone: { type: String, required: false },
  shipping_address: { type: String, required: false },
  isSeller: { type: Boolean, default: false }
},{
  timestamps:true
});

export default mongoose.model("User", userSchema)*/
// user.model.js

//this file is database level operation, it will make changes directly on database 
import db from '../database.js'; // Import your database connection

export const createUser = async (userData) => {
    const { username, email, password } = userData;
    const sql = `INSERT INTO Users (username, email, password) VALUES (?, ?, ?)`;
    const [result] = await db.execute(sql, [username, email, password]);
    return result.insertId;
};

export const getUserById = async (id) => {
    const sql = `SELECT * FROM Users WHERE UserID= ?`;
    const [rows] = await db.query(sql, [id]);
    return rows[0];
};

export const deleteUserById = async (id) => {
    const sql = `DELETE FROM Users WHERE UserID = ?`;
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows;
};

export const updateUserById = async (id, updates) => {
    const { username, email, location } = updates;
    const sql = `UPDATE Users SET username = ?, email = ?, location = ? WHERE UserID = ?`;
    const [result] = await db.execute(sql, [username, email, location, id]);
    return result.affectedRows;
};

export const getUserByUsername = async (username) => {
  const sql = `SELECT * FROM Users WHERE username = ?`;
  const [rows] = await db.query(sql, [username]);
  return rows[0]; // Returns the first user that matches the username
};

