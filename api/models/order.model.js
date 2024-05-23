import db from '../database.js'; // Import your database connection

export const createOrder = async (orderData) => {
  try {
    const { BuyerID, SellerID, ProductID, PaymentID, OrderDate, OrderStatus, AmountReceived, RemainingPayment } = orderData;

    // Debugging logs for parameters
    console.log("Order parameters:", {
      BuyerID, SellerID, ProductID, PaymentID, OrderDate, OrderStatus, AmountReceived, RemainingPayment
    });

    // Ensure none of the parameters are undefined
    if ([BuyerID, SellerID, ProductID, OrderDate, OrderStatus, AmountReceived, RemainingPayment].includes(undefined)) {
      throw new Error("One or more order parameters are undefined");
    }

    const sql = `
      INSERT INTO Orders (BuyerID, SellerID, ProductID, PaymentID, OrderDate, OrderStatus, AmountReceived, RemainingPayment) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(sql, [BuyerID, SellerID, ProductID, PaymentID, OrderDate, OrderStatus, AmountReceived, RemainingPayment]);
    return result.insertId;
  } catch (error) {
    console.error("Error creating order in database:", error);
    throw error;
  }
};


// Get order by ID
export const getOrderById = async (OrderID) => {
    const sql = `SELECT * FROM Orders WHERE OrderID = ?`;
    const [rows] = await db.query(sql, [OrderID]);
    return rows[0];
};

// Get all orders
export const getAllOrders = async () => {
    const sql = `SELECT * FROM Orders`;
    const [rows] = await db.query(sql);
    return rows;
};

// Update order by ID
export const updateOrderById = async (OrderID, updates) => {
    const { OrderStatus, AmountReceived, RemainingPayment } = updates;
    const sql = `
        UPDATE Orders 
        SET OrderStatus = ?, AmountReceived = ?, RemainingPayment = ? 
        WHERE OrderID = ?
    `;
    const [result] = await db.execute(sql, [OrderStatus, AmountReceived, RemainingPayment, OrderID]);
    return result.affectedRows;
};

// Delete order by ID
export const deleteOrderById = async (OrderID) => {
    const sql = `DELETE FROM Orders WHERE OrderID = ?`;
    const [result] = await db.execute(sql, [OrderID]);
    return result.affectedRows;
};

// Get orders by BuyerID
export const getOrdersByBuyerId = async (BuyerID) => {
    const sql = `SELECT * FROM Orders WHERE BuyerID = ?`;
    const [rows] = await db.query(sql, [BuyerID]);
    return rows;
};

// Get orders by SellerID
export const getOrdersBySellerId = async (SellerID) => {
    const sql = `SELECT * FROM Orders WHERE SellerID = ?`;
    const [rows] = await db.query(sql, [SellerID]);
    return rows;
};

export const getOrdersByProductId = async (ProductID) => {
    const sql = `SELECT * FROM Orders WHERE ProductID = ?`;
    const [rows] = await db.query(sql, [ProductID]);
    return rows;
};