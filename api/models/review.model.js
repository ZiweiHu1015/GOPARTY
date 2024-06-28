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
export const updateProductReviewStats = async (productId, newRating) => {
    const getCurrentStatsSql = `
        SELECT AverageRating, ReviewCount 
        FROM Listings 
        WHERE ProductID = ?
    `;
    const [rows] = await db.query(getCurrentStatsSql, [productId]);
    const { AverageRating, ReviewCount } = rows[0];
    console.log("Fetched AverageRating, ReviewCount:", AverageRating, ReviewCount);

    // Convert to number
    const averageRatingNum = Number(AverageRating);
    const reviewCountNum = Number(ReviewCount);
    const newRatingNum = Number(newRating);

    // Calculate
    const newReviewCount = reviewCountNum + 1;
    const totalRating = averageRatingNum * reviewCountNum + newRatingNum;
    const newAvgRating = totalRating / newReviewCount;

    const updateStatsSql = `
        UPDATE Listings 
        SET AverageRating = ?, ReviewCount = ? 
        WHERE ProductID = ?
    `;
    const [result] = await db.execute(updateStatsSql, [newAvgRating, newReviewCount, productId]);
    console.log("Update operation affected rows:", result.affectedRows);

    return result.affectedRows;
};


// Function to retrieve reviews by product
export const getReviewsByProduct = async (productId) => {
    const sql = `SELECT * FROM Reviews WHERE ProductID = ? ORDER BY Timestamp DESC`;
    const [rows] = await db.query(sql, [productId]);
    return rows;
};

export const deleteReviewById = async (reviewId) => {
    console.log(deleteReviewById);
    // Get product rating
    const getReviewDetailsSql = `SELECT ProductID, Rating FROM Reviews WHERE ReviewID = ?`;
    const [reviewResults] = await db.execute(getReviewDetailsSql, [reviewId]);
    if (reviewResults.length === 0) {
        throw new Error('No review found with the given ID');
    }
    const productId = reviewResults[0].ProductID;
    const ratingToDelete = reviewResults[0].Rating;

    // Calculate rating
    const getStatsSql = `SELECT AverageRating, ReviewCount FROM Listings WHERE ProductID = ?`;
    const [statsResults] = await db.execute(getStatsSql, [productId]);
    if (statsResults.length === 0) {
        throw new Error('No listing found with the given Product ID');
    }
    let { AverageRating, ReviewCount } = statsResults[0];

    if (ReviewCount === 1) {
        AverageRating = 0;                  // set as 0 when there is no review
    } else {
        const totalRating = AverageRating * ReviewCount - ratingToDelete;
        AverageRating = totalRating / (ReviewCount - 1);
    }

    // Update product rating
    const updateListingSql = `
        UPDATE Listings 
        SET AverageRating = ?, ReviewCount = ReviewCount - 1
        WHERE ProductID = ?
    `;
    await db.execute(updateListingSql, [AverageRating, productId]);

    // Del from Reviews
    const deleteSql = `DELETE FROM Reviews WHERE ReviewID = ?`;
    const [deleteResult] = await db.execute(deleteSql, [reviewId]);
    if (deleteResult.affectedRows === 0) {
        throw new Error('Deletion failed, no review was deleted');
    }

    return deleteResult.affectedRows;
};

