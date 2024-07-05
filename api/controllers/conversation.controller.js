import createError from "../utils/createError.js";
import * as ConversationModel from "../models/conversation.model.js";

export const createConversation = async (req, res, next) => {
    const { userId, body: { to }, isSeller } = req;
    const sellerId = isSeller ? userId : to;
    const buyerId = isSeller ? to : userId;
    
    try {
        const result = await ConversationModel.insertConversation(sellerId, buyerId, isSeller);
        res.status(201).send({ id: result.insertId, sellerId, buyerId, readBySeller: isSeller, readByBuyer: !isSeller });
    } catch (err) {
        console.error("Error creating conversation:", err);
        next(createError(500, "Server error while creating conversation"));
    }
};

export const updateConversationIsRead = async (req, res, next) => {
  const { id } = req.params;
  const readBySeller = req.isSeller;
  
  try {
      const result = await ConversationModel.updateConversationIsReadStatus(id, readBySeller);
      if (result.affectedRows === 0) {
          return next(createError(404, "Conversation not found"));
      }
      res.status(200).send({ message: 'Conversation updated successfully' });
  } catch (err) {
      console.error("Error updating conversation:", err);
      next(createError(500, "Server error while updating conversation"));
  }
};


// export const updateConversationLastMessage = async (req, res, next) => {
//   const { id } = req.params;
//   const readBySeller = req.isSeller;
  
//   try {
//       const result = await ConversationModel.updateConversationStatus(id, readBySeller);
//       if (result.affectedRows === 0) {
//           return next(createError(404, "Conversation not found"));
//       }
//       res.status(200).send({ message: 'Conversation updated successfully' });
//   } catch (err) {
//       console.error("Error updating conversation:", err);
//       next(createError(500, "Server error while updating conversation"));
//   }
// };

export const getSingleConversation = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const conversation = await ConversationModel.findConversationById(id);
        if (!conversation) {
            return next(createError(404, "Conversation not found"));
        }
        res.status(200).send(conversation);
    } catch (err) {
        console.error("Error retrieving conversation:", err);
        next(createError(500, "Server error while retrieving conversation"));
    }
};

export const getConversations = async (req, res, next) => {
    const userId = req.userId;
    const userColumn = req.isSeller ? 'sellerId' : 'buyerId';
    
    try {
        const rows = await ConversationModel.findAllConversationsByUser(userId, userColumn);
        res.status(200).send(rows);
    } catch (err) {
        console.error("Error retrieving conversations:", err);
        next(createError(500, "Server error while retrieving conversations"));
    }
};
