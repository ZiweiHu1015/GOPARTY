import createError from "../utils/createError.js";
import {
  createMessage as modelCreateMessage,
  getMessagesByConversationId as modelGetMessageByConversationId,
  updateConversation as modelUpdateConversation
} from "../models/message.model.js";

export const createMessage = async (req, res, next) => {
  const { conversationId, desc } = req.body;
  const userId = req.userId;

  try {
    let conversation = await modelGetMessageByConversationId(conversationId);

    if (!conversation) {
      await modelCreateMessage(conversationId, userId); // Adjust this function to create conversation correctly
      conversation = await modelGetMessageByConversationId(conversationId); // Optionally re-fetch
    }

    const messageData = {
      conversationId,
      userId,
      desc
    };

    console.log("Controller: Creating message with data:", messageData);
    const messageId = await modelCreateMessage(messageData);
    console.log("Controller: Message created with ID:", messageId);

    res.status(201).send({ messageId, message: desc });
  } catch (err) {
    console.error("Controller: Error creating message:", err);
    next(createError(500, "Server error while creating message"));
  }
};


export const getMessages = async (req, res, next) => {
  try {
    const messages = await modelGetMessageByConversationId(req.params.id);
    res.status(200).send(messages);
  } catch (err) {
    next(createError(500, "Server error while retrieving messages"));
  }
};