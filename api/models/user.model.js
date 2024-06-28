//this file is database level operation, it will make changes directly on database 
import db from '../database.js'; // Import your database connection

export const createUser = async (userData) => {
    const { username, email, password, isSeller } = userData;
    const sql = `INSERT INTO Users (username, email, password, isSeller) VALUES (?, ?, ?, ?)`;
    const [result] = await db.execute(sql, [username, email, password, isSeller]);
    return result.insertId;
};

export const getUserById = async (id) => {
  // First, get the user information and check if the user is a seller
  const userSql = `SELECT * FROM Users WHERE UserID = ?`;
  const [userRows] = await db.query(userSql, [id]);
  const user = userRows[0];

  if (!user) {
    throw new Error("User not found");
  }

  // Check if the user is a seller
  const isSeller = user.isSeller === 1; // Assuming 1 indicates a seller

  if (isSeller) {
    // If the user is a seller, join with the Sellers table and return combined data
    const sellerSql = `
      SELECT 
        u.UserID, 
        u.FirstName,
        u.CreatedAt,
        s.StoreName, 
        s.StoreDescription, 
        s.MainService, 
        s.ServiceDays, 
        s.ServiceArea, 
        s.ServiceType,
        s.StoreRating
      FROM 
        Users u
        JOIN Sellers s ON u.UserID = s.UserID
      WHERE 
        u.UserID = ?;
    `;
    const [sellerRows] = await db.query(sellerSql, [id]);
    return sellerRows[0];
  } else {
    // If the user is not a seller, return user information only
    return user;
  }
};


export const deleteUserById = async (id) => {
    const sql = `DELETE FROM Users WHERE UserID = ?`;
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows;
};

export const updateUserById = async (id, updates) => {
  const { FirstName, LastName, Location, PhoneNumber, ProfilePicture, ShippingAddress } = updates;

  const fieldsToUpdate = [];
  const values = [];

  if (FirstName !== undefined) {
      fieldsToUpdate.push("FirstName = ?");
      values.push(FirstName);
  }
  if (LastName !== undefined) {
      fieldsToUpdate.push("LastName = ?");
      values.push(LastName);
  }
  if (Location !== undefined) {
      fieldsToUpdate.push("Location = ?");
      values.push(Location);
  }
  if (PhoneNumber !== undefined) {
      fieldsToUpdate.push("PhoneNumber = ?");
      values.push(PhoneNumber);
  }
  if (ProfilePicture !== undefined) {
      fieldsToUpdate.push("ProfilePicture = ?");
      values.push(ProfilePicture);
  }
  if (ShippingAddress !== undefined) {
      fieldsToUpdate.push("ShippingAddress = ?");
      values.push(ShippingAddress);
  }

  if (fieldsToUpdate.length === 0) {
      throw new Error("No fields to update");
  }

  values.push(id);
  const sql = `UPDATE Users SET ${fieldsToUpdate.join(", ")} WHERE UserID = ?`;

  const [result] = await db.execute(sql, values);
  return result.affectedRows;
};


export const getUserByUsername = async (username) => {
  const sql = `SELECT * FROM Users WHERE username = ?`;
  const [rows] = await db.query(sql, [username]);
  return rows[0]; // Returns the first user that matches the username
};

