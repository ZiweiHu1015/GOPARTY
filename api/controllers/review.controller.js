import createError from "../utils/createError.js";
import { createReview as modelCreateReview, 
  findReviewByProductAndUser, 
  updateProductReviewStats, 
  getReviewsByProduct,
  deleteReviewById } from "../models/review.model.js";

export const createReview = async (req, res, next) => {
  if (req.isSeller) {
      return next(createError(403, "Sellers can't create a review!"));
  }

  const userId = req.userId;  
  const { productId, comment, rating, sellerId } = req.body;  

  console.log("req.productId:",req.body.productId);
  console.log("req.body:",req.body);

  try {
      // Check if a review already exists to prevent duplicates
      const existingReview = await findReviewByProductAndUser(userId, productId);
      if (existingReview) {
          return next(createError(403, "You have already created a review for this product!"));
      }

      // Prepare review data for the model function
      const reviewData = {
        buyerId: userId,
        productId,
        sellerId,
        rating,
        comment,
        images: null
      };

      console.log("Creating review with data:", reviewData);
      const reviewId = await modelCreateReview(reviewData);
      await updateProductReviewStats(productId, rating);

      const savedReview = { reviewId, userId, productId, desc, rating };
      res.status(201).send(savedReview);
  } catch (err) {
      console.error('Failed to create review:', err);
      next(createError(500, 'Server error while creating review'));
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await getReviewsByProduct(req.params.productId); // Note the parameter name change to productId
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};

export const deleteReview = async (req, res, next) => {
  const { reviewId } = req.params;  
  
  console.log("Deleting review with ID:", reviewId);
  try {
      const affectedRows = await deleteReviewById(reviewId);
      if (affectedRows === 0) {
          return next(createError(404, "Review not found"));  
      }
      res.status(200).send({ message: `Review ID ${reviewId} has been successfully deleted.` });
  } catch (err) {
      console.error("Failed to delete review:", err);
      next(createError(500, "Server error while deleting review"));
  }
};