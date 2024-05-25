import db from '../database.js'; // Ensure this points to your configured MySQL connection

// Function to create a review with correct parameter mapping
export const createReview = async (reviewData) => {
  const {
      buyerId,
      productId,
      sellerId,
      rating,
      comment,
      images = null  // Default to null if not provided
  } = reviewData;

  // Check for undefined and set to null if necessary
  const parameters = [
      productId, 
      sellerId, 
      buyerId , 
      rating , 
      comment, 
      images
  ];

  const sql = `
      INSERT INTO Reviews (ProductID, SellerID, BuyerID, Rating, Comment, Images, Timestamp)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;

  try {
      const [result] = await db.execute(sql, parameters);
      return result.insertId;
  } catch (error) {
      console.error('Failed to create review: ' + error.message);
      throw new Error('Failed to create review: ' + error.message);
  }
};


// Function to find a review by product and user
export const findReviewByProductAndUser = async (buyerId, productId) => {
    const sql = `SELECT * FROM Reviews WHERE BuyerID = ? AND ProductID = ?`;
    const [rows] = await db.query(sql, [buyerId, productId]);
    return rows[0]; // Returns the first review found, or undefined if none
};

// Function to update review statistics in the Listings table (assuming you're updating Listings not Orders)
export const updateProductReviewStats = async (productId, rating) => {
    const sql = `
        UPDATE Listings 
        SET totalStars = totalStars + ?, starNumber = starNumber + 1
        WHERE ProductID = ?
    `;
    const [result] = await db.execute(sql, [rating, productId]);
    return result.affectedRows;
};

// Function to retrieve reviews by product
export const getReviewsByProduct = async (productId) => {
    const sql = `SELECT * FROM Reviews WHERE ProductID = ? ORDER BY Timestamp DESC`;
    const [rows] = await db.query(sql, [productId]);
    return rows;
};

export const deleteReviewById = async (reviewId) => {
  const sql = `DELETE FROM Reviews WHERE ReviewID = ?`;
  const [result] = await db.execute(sql, [reviewId]);
  return result.affectedRows;  // This will return the number of rows affected by the delete operation
};