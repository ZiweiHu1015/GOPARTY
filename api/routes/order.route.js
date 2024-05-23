import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {getOrders, 
        intent, 
        confirm,  
        getOrdersByBuyerId,  
        getOrdersBySellerId,
        getOrdersByProductId} from "../controllers/order.controller.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, confirm);

router.get("/buyer/:buyerId", verifyToken, getOrdersByBuyerId);
router.get("/seller/:sellerId", verifyToken, getOrdersBySellerId);
router.get("/product/:productId", verifyToken, getOrdersByProductId);

export default router;
