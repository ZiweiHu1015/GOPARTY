USE goPartyDatabase;

-- INSERT INTO Conversations (sellerId, buyerId, readBySeller, readByBuyer, createdAt, updatedAt)
-- VALUES (95, 96, 1, 0, NOW(), NOW());
DELETE FROM Conversations WHERE buyerID = 96;
select * from Conversations;