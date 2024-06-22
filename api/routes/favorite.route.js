import express from 'express';
import { addFavoriteItem, removeFavoriteItem, getUserFavorites, getUsersWhoFavoritedItem } from '../controllers/favorite.controller.js';
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// Add an item to favorites
router.post('/add', verifyToken, addFavoriteItem);

// Remove an item from favorites
router.delete('/remove/:productId', verifyToken, removeFavoriteItem);

// Get all favorite items for a user
router.get('/user', verifyToken, getUserFavorites);

// Get all users who favorited a specific item
router.get('/item/:productId', verifyToken, getUsersWhoFavoritedItem);

export default router;
