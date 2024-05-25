import createError from "../utils/createError.js";
import {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrderById,
  deleteOrderById,
  getOrdersByBuyerId as modelGetOrdersByBuyerId,  // Avoid name conflict
  getOrdersBySellerId as modelGetOrdersBySellerId, // Avoid name conflict
  getOrdersByProductId as modelGetOrdersByProductId // Avoid name conflict
} from "../models/order.model.js";
import Stripe from "stripe";
import { getListingById } from "../models/listing.model.js";

const stripe = new Stripe(process.env.STRIPE);

export const intent = async (req, res, next) => {
  try {
    const listing = await getListingById(req.params.id);

    if (!listing) {
      return next(createError(404, "Listing not found"));
    }

    // Ensure listing.Price is a number
    const price = parseFloat(listing.Price);

    if (isNaN(price)) {
      return next(createError(400, "Invalid listing price"));
    }

    const amount = Math.round(price * 100); // Convert to cents
    console.log("Calculated amount:", amount);

    if (isNaN(amount)) {
      return next(createError(400, "Calculated amount is invalid"));
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const orderData = {
      BuyerID: req.userId,
      SellerID: listing.SellerID, // Ensure this is the correct field for the seller's ID in your Listings table
      ProductID: listing.ProductID,
      PaymentID: null, // This will be updated when payment is confirmed
      OrderDate: new Date(),
      OrderStatus: 'Pending',
      AmountReceived: 0, 
      RemainingPayment: price,
    };

    const orderId = await createOrder(orderData);

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
      orderId: orderId,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    next(createError(500, "Server error while creating payment intent"));
  }
};

export const getOrders = async (req, res, next) => {
  try {
    let orders;
    if (req.isSeller) {
      orders = await modelGetOrdersBySellerId(req.userId);
    } else {
      orders = await modelGetOrdersByBuyerId(req.userId);
    }

    res.status(200).send(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    next(createError(500, "Server error while retrieving orders"));
  }
};

export const confirm = async (req, res, next) => {
  try {
    const { payment_intent } = req.body; // Assuming payment_intent is provided in the request body
    const order = await updateOrderById(payment_intent, {
      OrderStatus: 'Confirmed',
      AmountReceived: req.body.AmountReceived || 0, // Update with actual amount received
      RemainingPayment: req.body.RemainingPayment || 0, // Update with actual remaining payment
    });

    if (!order) {
      return next(createError(404, "Order not found"));
    }

    res.status(200).send("Order has been confirmed.");
  } catch (error) {
    console.error("Error confirming order:", error);
    next(createError(500, "Server error while confirming order"));
  }
};

// Get orders by BuyerID
export const getOrdersByBuyerId = async (req, res, next) => {
  try {
    const orders = await modelGetOrdersByBuyerId(req.params.buyerId);
    res.status(200).send(orders);
  } catch (error) {
    console.error("Error retrieving orders by BuyerID:", error);
    next(createError(500, "Server error while retrieving orders by BuyerID"));
  }
};

// Get orders by SellerID
export const getOrdersBySellerId = async (req, res, next) => {
  try {
    const orders = await modelGetOrdersBySellerId(req.params.sellerId);
    res.status(200).send(orders);
  } catch (error) {
    console.error("Error retrieving orders by SellerID:", error);
    next(createError(500, "Server error while retrieving orders by SellerID"));
  }
};

// Get orders by ProductID
export const getOrdersByProductId = async (req, res, next) => {
  try {
    const orders = await modelGetOrdersByProductId(req.params.productId);
    res.status(200).send(orders);
  } catch (error) {
    console.error("Error retrieving orders by ProductID:", error);
    next(createError(500, "Server error while retrieving orders by ProductID"));
  }
};
