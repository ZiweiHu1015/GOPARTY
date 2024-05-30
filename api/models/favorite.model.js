import db from '../database.js'; // Ensure this points to your configured MySQL connection

// Add an item to favorites
export const addFavorite = async (userId, productId) => {
  const sql = `
    INSERT INTO Favorites (UserID, ProductID)
    VALUES (?, ?)
  `;
  try {
    const [result] = await db.execute(sql, [userId, productId]);
    return result.insertId;
  } catch (error) {
    console.error('Failed to add item to favorites: ' + error.message);
    throw new Error('Failed to add item to favorites: ' + error.message);
  }
};

// Remove an item from favorites
export const removeFavorite = async (userId, productId) => {
  const sql = `
    DELETE FROM Favorites WHERE UserID = ? AND ProductID = ?
  `;
  try {
    const [result] = await db.execute(sql, [userId, productId]);
    return result.affectedRows;
  } catch (error) {
    console.error('Failed to remove item from favorites: ' + error.message);
    throw new Error('Failed to remove item from favorites: ' + error.message);
  }
};

// Get all favorite items for a user
export const getFavoritesByUserId = async (userId) => {
  const sql = `
    SELECT L.* FROM Listings L
    JOIN Favorites F ON L.ProductID = F.ProductID
    WHERE F.UserID = ?
  `;
  try {
    const [rows] = await db.query(sql, [userId]);
    return rows;
  } catch (error) {
    console.error('Failed to get favorite items: ' + error.message);
    throw new Error('Failed to get favorite items: ' + error.message);
  }
};

// Get all users who favorited a specific item
export const getUsersByFavoriteProductId = async (productId) => {
  const sql = `
    SELECT U.* FROM Users U
    JOIN Favorites F ON U.UserID = F.UserID
    WHERE F.ProductID = ?
  `;
  try {
    const [rows] = await db.query(sql, [productId]);
    return rows;
  } catch (error) {
    console.error('Failed to get users who favorited the item: ' + error.message);
    throw new Error('Failed to get users who favorited the item: ' + error.message);
  }
};
