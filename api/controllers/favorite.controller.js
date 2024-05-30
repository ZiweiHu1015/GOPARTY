import { addFavorite, removeFavorite, getFavoritesByUserId, getUsersByFavoriteProductId } from '../models/favorite.model.js';
import createError from '../utils/createError.js';

// Add an item to favorites
export const addFavoriteItem = async (req, res, next) => {
  const userId = req.userId;
  const { productId } = req.body;
  
  try {
    const favoriteId = await addFavorite(userId, productId);
    res.status(201).send({ favoriteId, message: "Item added to favorites" });
  } catch (error) {
    next(createError(500, "Server error while adding item to favorites"));
  }
};

// Remove an item from favorites
export const removeFavoriteItem = async (req, res, next) => {
  const userId = req.userId;
  const { productId } = req.params;
  
  try {
    const result = await removeFavorite(userId, productId);
    if (result === 0) {
      return next(createError(404, "Favorite item not found"));
    }
    res.status(200).send({ message: "Favorite item removed" });
  } catch (error) {
    next(createError(500, "Server error while removing favorite item"));
  }
};

// Get all favorite items for a user
export const getUserFavorites = async (req, res, next) => {
  const userId = req.userId;
  
  try {
    const favorites = await getFavoritesByUserId(userId);
    res.status(200).send(favorites);
  } catch (error) {
    next(createError(500, "Server error while retrieving favorite items"));
  }
};

// Get all users who favorited a specific item
export const getUsersWhoFavoritedItem = async (req, res, next) => {
  const { productId } = req.params;
  
  try {
    const users = await getUsersByFavoriteProductId(productId);
    res.status(200).send(users);
  } catch (error) {
    next(createError(500, "Server error while retrieving users who favorited the item"));
  }
};
