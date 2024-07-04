import createError from "../utils/createError.js";
import db from '../database.js'; // Import your configured database connection

export const createConversation = async (req, res, next) => {// Log incoming request body

  const { userId, body: { to }, isSeller } = req;
  const sellerId = isSeller ? userId : to;
  const buyerId = isSeller ? to : userId;
  
  const sql = `
    INSERT INTO Conversations (sellerId, buyerId, readBySeller, readByBuyer)
    VALUES (?, ?, ?, ?)
  `;
  
  try {
    const [result] = await db.execute(sql, [sellerId, buyerId, isSeller, !isSeller]);
    
    res.status(201).send({ id: result.insertId, sellerId, buyerId, readBySeller: isSeller, readByBuyer: !isSeller });
  } catch (err) {
    console.error("Error creating conversation:", err);
    next(createError(500, "Server error while creating conversation"));
  }
};

export const updateConversation = async (req, res, next) => {
  const { id } = req.params;
  const readBySeller = req.isSeller;
  const readByBuyer = !req.isSeller;

  const sql = `
    UPDATE Conversations
    SET readBySeller = ?, readByBuyer = ?
    WHERE ConversationID = ?
  `;

  try {
    const [result] = await db.execute(sql, [readBySeller, readByBuyer, id]);
    if (result.affectedRows === 0) {
      return next(createError(404, "Conversation not found"));
    }
    res.status(200).send({ message: 'Conversation updated successfully' });
  } catch (err) {
    console.error("Error updating conversation:", err);
    next(createError(500, "Server error while updating conversation"));
  }
};

export const getSingleConversation = async (req, res, next) => {
  const { id } = req.params;

  const sql = `SELECT * FROM Conversations WHERE ConversationID = ?`;

  try {
    const [rows] = await db.query(sql, [id]);
    if (rows.length === 0) return next(createError(404, "Conversation not found"));
    res.status(200).send(rows[0]);
  } catch (err) {
    console.error("Error retrieving conversation:", err);
    next(createError(500, "Server error while retrieving conversation"));
  }
};

export const getConversations = async (req, res, next) => {
  const userId = req.userId;
  const userColumn = req.isSeller ? 'sellerId' : 'buyerId';
  // 
  console.log("userColumn: userId:", userColumn, userId);
  
  const sql = `SELECT * FROM Conversations WHERE ${userColumn} = ? ORDER BY updatedAt DESC`;
  
  try {
    const [rows] = await db.query(sql, [userId]);
    // 
    console.log("[rows]:", rows);
    res.status(200).send(rows);
  } catch (err) {
    console.error("Error retrieving conversations:", err);
    next(createError(500, "Server error while retrieving conversations"));
  }
};
