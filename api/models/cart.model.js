import db from '../database.js'; // Ensure this points to your configured MySQL connection

// Function to add an item to the cart
export const addItemToCart = async (userId, productId, quantity = 1) => {
  const sql = `
    INSERT INTO ShoppingCart (UserID, ProductID, Quantity)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE Quantity = Quantity + VALUES(Quantity)
  `;
  try {
    const [result] = await db.execute(sql, [userId, productId, quantity]);
    return result.insertId;
  } catch (error) {
    console.error('Failed to add item to cart: ' + error.message);
    throw new Error('Failed to add item to cart: ' + error.message);
  }
};

// Function to retrieve cart items grouped by SellerID
export const getCartItemsGroupedBySeller = async () => {
  const sql = `
    SELECT SC.CartID, SC.UserID, SC.ProductID, SC.Quantity, L.SellerID, L.Title, L.Price, L.CoverImage
    FROM ShoppingCart SC
    JOIN Listings L ON SC.ProductID = L.ProductID
    ORDER BY L.SellerID
  `;
  try {
    const [rows] = await db.query(sql);
    const groupedItems = rows.reduce((acc, item) => {
      if (!acc[item.SellerID]) {
        acc[item.SellerID] = [];
      }
      acc[item.SellerID].push(item);
      return acc;
    }, {});
    return groupedItems;
  } catch (error) {
    console.error('Failed to get cart items grouped by seller: ' + error.message);
    throw new Error('Failed to get cart items grouped by seller: ' + error.message);
  }
};

// Function to update the quantity of a cart item by userId and productId
export const updateCartItemQuantity = async (userId, productId, quantity) => {
    const sql = `UPDATE ShoppingCart SET Quantity = ? WHERE UserID = ? AND ProductID = ?`;
    try {
      const [result] = await db.execute(sql, [quantity, userId, productId]);
      return result.affectedRows;
    } catch (error) {
      console.error('Failed to update cart item quantity: ' + error.message);
      throw new Error('Failed to update cart item quantity: ' + error.message);
    }
  };
  

// Function to remove an item from the cart
export const removeItemFromCart = async (userId, productId) => {
  const sql = `DELETE FROM ShoppingCart WHERE UserID = ? AND ProductID = ?`;
 
  console.log("userid: ",userId,"productId: ",productId );
  try {
    const [result] = await db.execute(sql, [userId, productId]);
    
    return result.affectedRows;
  } catch (error) {
  
    console.error('Failed to remove item from cart: ' + error.message);
    throw new Error('Failed to remove item from cart: ' + error.message);
  }
};

// Function to clear the cart for a user
export const clearCartByUserId = async (userId) => {
  const sql = `DELETE FROM ShoppingCart WHERE UserID = ?`;
  try {
    const [result] = await db.execute(sql, [userId]);
    return result.affectedRows;
  } catch (error) {
    console.error('Failed to clear cart: ' + error.message);
    throw new Error('Failed to clear cart: ' + error.message);
  }
};
