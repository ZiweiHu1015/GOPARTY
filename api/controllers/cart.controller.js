import {
    addItemToCart,
    updateCartItemQuantity,
    removeItemFromCart,
    clearCartByUserId,
    getCartItemsGroupedBySeller
  } from '../models/cart.model.js';
  import createError from '../utils/createError.js';
  
  // Add an item to the cart
  export const addToCart = async (req, res, next) => {
    const { productId, quantity } = req.body;
    const userId = req.userId;
  
    try {
      const cartId = await addItemToCart(userId, productId, quantity);
      res.status(201).send({ cartId, message: "Item added to cart" });
    } catch (error) {
      next(createError(500, "Server error while adding item to cart"));
    }
  };
  
 // Update the quantity of a cart item by userId and productId
export const updateCartItem = async (req, res, next) => {
    const { productId, quantity } = req.body;
    const userId = req.userId;
  
    try {
      const result = await updateCartItemQuantity(userId, productId, quantity);
      if (result === 0) {
        return next(createError(404, "Cart item not found"));
      }
      res.status(200).send({ message: "Cart item updated" });
    } catch (error) {
      next(createError(500, "Server error while updating cart item"));
    }
  };
  
  
  // Remove an item from the cart
  export const removeCartItem = async (req, res, next) => {
    const { productId } = req.params;
    const userId = req.userId;
  
    console.log("Received request to remove item from cart.");
    console.log("userId:", userId, "productId:", productId); // Debug log

    try {
      console.log(`Attempting to remove cart item with UserID: ${userId} and ProductID: ${productId}`);
      const result = await removeItemFromCart(userId, productId);
      if (result === 0) {
        console.log(`No cart item found with UserID: ${userId} and ProductID: ${productId}`);
        return next(createError(404, "Cart item not found"));
      }
      res.status(200).send({ message: "Cart item removed" });
    } catch (error) {
      console.error(`Server error while removing cart item: ${error.message}`);
      next(createError(500, "Server error while removing cart item"));
    }
  };
  
  // Clear the cart for a user
  export const clearCart = async (req, res, next) => {
    const userId = req.userId;
  
    try {
      const result = await clearCartByUserId(userId);
      res.status(200).send({ message: "Cart cleared" });
    } catch (error) {
      next(createError(500, "Server error while clearing cart"));
    }
  };
  
  // Get cart items grouped by seller
  export const getCartItemsBySeller = async (req, res, next) => {
    try {
      const groupedItems = await getCartItemsGroupedBySeller();
      res.status(200).send(groupedItems);
    } catch (error) {
      next(createError(500, "Server error while retrieving cart items grouped by seller"));
    }
  };
  