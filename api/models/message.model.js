/*import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new Schema({
  conversationId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
},{
  timestamps:true
});

export default mongoose.model("Message", MessageSchema)*/
import db from '../database.js'; // Import your database connection

// Create a new message
export const createMessage = async (messageData) => {
  const { conversationId, userId, desc } = messageData;
  const sql = `
      INSERT INTO Messages (ConversationID, UserID, Description, CreatedAt, UpdatedAt)
      VALUES (?, ?, ?, NOW(), NOW())
  `;
  try {
      const [result] = await db.execute(sql, [conversationId, userId, desc]);
      return { insertId: result.insertId, message: "Message created successfully" };
  } catch (error) {
      console.error("Error creating message in database:", error);
      throw error; // rethrow the error to be handled in the controller
  }
};

// Function to retrieve all messages for a specific conversation
export const getMessagesByConversationId = async (conversationId) => {
  const sql = `SELECT * FROM Messages WHERE ConversationID = ? ORDER BY CreatedAt ASC`;
  try {
      const [rows] = await db.query(sql, [conversationId]);
      return rows; // returns an array of messages
  } catch (error) {
      console.error("Error retrieving messages by conversation ID:", error);
      throw error; // rethrow the error to be handled in the controller
  }
};
// Update conversation
export const updateConversation = async (conversationId, updates) => {
  try {
    const { readBySeller, readByBuyer, lastMessage } = updates;
    const sql = `
      UPDATE Conversations 
      SET readBySeller = ?, readByBuyer = ?, lastMessage = ?, UpdatedAt = NOW()
      WHERE ConversationID = ?
    `;
    const [result] = await db.execute(sql, [readBySeller, readByBuyer, lastMessage, conversationId]);
    return result.affectedRows;
  } catch (error) {
    console.error("Error updating conversation in database:", error);
    throw error;
  }
};
