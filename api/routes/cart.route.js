import express from 'express';
import { 
  addToCart, 
  updateCartItem, 
  removeCartItem, 
  clearCart, 
  getCartItemsBySeller 
} from '../controllers/cart.controller.js';
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post('/', verifyToken, addToCart);
router.get('/', verifyToken, getCartItemsBySeller);
router.put('/', verifyToken, updateCartItem);
router.delete('/:productId', verifyToken, removeCartItem);
router.delete('/', verifyToken, clearCart);


export default router;
