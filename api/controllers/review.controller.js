import createError from "../utils/createError.js";
import { createReview as modelCreateReview, findReviewByProductAndUser, updateProductReviewStats, getReviewsByProduct } from "../models/review.model.js";

export const createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(createError(403, "Sellers can't create a review!"));

  const { userId, body: { productId, desc, star } } = req;

  try {
    const existingReview = await findReviewByProductAndUser(userId, productId);
    if (existingReview)
      return next(createError(403, "You have already created a review for this product!"));

    const reviewId = await modelCreateReview({ userId, productId, desc, star });
    await updateProductReviewStats(productId, star);

    const savedReview = { reviewId, userId, productId, desc, star };
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
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
  const { reviewId } = req.params;  // Assuming the review ID is passed as a URL parameter

  try {
      const affectedRows = await deleteReviewById(reviewId);
      if (affectedRows === 0) {
          return next(createError(404, "Review not found"));  // No rows affected implies no review found with the given ID
      }
      res.status(204).send();  // Send no content status after successful deletion
  } catch (err) {
      console.error("Failed to delete review:", err);
      next(createError(500, "Server error while deleting review"));
  }
};