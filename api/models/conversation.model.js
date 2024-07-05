import db from '../database.js'; // Import your configured database connection

export const insertConversation = async (sellerId, buyerId, isSeller) => {
    const sql = `
        INSERT INTO Conversations (sellerId, buyerId, readBySeller, readByBuyer)
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.execute(sql, [sellerId, buyerId, isSeller, !isSeller]);
    return result;
};

export const updateConversationIsReadStatus = async (conversationId, isSeller) => {
    const sql = `
        UPDATE Conversations
        SET readBySeller = IF(? = 1, TRUE, readBySeller), 
            readByBuyer = IF(? = 0, TRUE, readByBuyer)
        WHERE ConversationID = ?
    `;
    const [result] = await db.execute(sql, [isSeller, isSeller, conversationId]);
    return result;
};


// export const updateConversationLastMessageStatus = async (conversationId, isSeller) => {
//     const sql = `
//         UPDATE Conversations
//         SET readBySeller = ?, readByBuyer = ?
//         WHERE ConversationID = ?
//     `;
//     const [result] = await db.execute(sql, [isSeller, !isSeller, conversationId]);
//     return result;
// };

export const findConversationById = async (conversationId) => {
    const sql = `SELECT * FROM Conversations WHERE ConversationID = ?`;
    const [rows] = await db.query(sql, [conversationId]);
    return rows.length ? rows[0] : null;
};

export const findAllConversationsByUser = async (userId, userColumn) => {
    const sql = `SELECT * FROM Conversations WHERE ${userColumn} = ? ORDER BY updatedAt DESC`;
    const [rows] = await db.query(sql, [userId]);
    return rows;
};
