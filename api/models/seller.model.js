// Assuming you have a similar setup for interacting with your database
import db from '../database.js'; 

export const createSeller = async (sellerData) => {
  const { UserID, StoreName, StoreDescription, MainService, ServiceDays, ServiceArea, ServiceType } = sellerData;
  const sql = `INSERT INTO Sellers (UserID, StoreName, StoreDescription, MainService, ServiceDays, ServiceArea, ServiceType)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  await db.execute(sql, [UserID, StoreName, StoreDescription, MainService, ServiceDays, ServiceArea, ServiceType]);
};
