// listing.model.js
import db from '../database.js'; // Import your database connection

export const createListing = async (listingData) => {
    const {
        SellerID: userId,
        Title: title,
        Description: description,
        Category: category,
        Price: price,
        CoverImage: coverImage,
        AvailableStartDate: availableStartDate,
        AvailableEndDate: availableEndDate,
        DeliveryType: deliveryType,
        ColorOptions: colorOptions,
        SizeOptions: sizeOptions,
        PersonalizationOptions: personalizationOptions,
        Images: images 
    } = listingData;
    
    //console.log("Received listing data:", listingData);

    const sql = `INSERT INTO Listings 
                    (SellerID, Title, Description, Category, Price, CoverImage, AvailableStartDate, AvailableEndDate, DeliveryType, ColorOptions, SizeOptions, PersonalizationOptions, Images)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        userId,
        title,
        description,
        category,
        price ,
        coverImage ,
        availableStartDate || null,
        availableEndDate || null,
        deliveryType ,
        colorOptions,
        sizeOptions,
        personalizationOptions || null,
        images ? JSON.stringify(images) : null
    ];
    console.log("Values to insert:", values);

    const [result] = await db.execute(sql, values);
    return result.insertId;
};

export const getListingById = async (listingId) => {
    const sql = `SELECT * FROM Listings WHERE ProductID = ?`;
    const [rows] = await db.query(sql, [listingId]);
    return rows[0];
};

export const deleteListingById = async (listingId) => {
    const sql = `DELETE FROM Listings WHERE ProductID  = ?`;
    const [result] = await db.execute(sql, [listingId]);
    return result.affectedRows;
};

export const updateListingById = async (listingId, updates) => {
    const { title, desc, color, size, cat, price, cover, images, deliveryType, features, personalization } = updates;
    const sql = `UPDATE Listings SET Title = ?, Description = ?, Color = ?, Size = ?, Category = ?, Price = ?, CoverImage = ?, Images = ?, DeliveryType = ?, Features = ?, Personalization = ? 
                 WHERE ProductID  = ?`;
    const values = [title, desc, color, size, cat, price, cover, JSON.stringify(images), JSON.stringify(deliveryType), JSON.stringify(features), JSON.stringify(personalization), listingId];
    const [result] = await db.execute(sql, values);
    return result.affectedRows;
};

export const getListingsBySellerId = async (sellerId) => {
    try {
        const sql = `
            SELECT L.* 
            FROM Listings L
            JOIN Users U ON L.SellerID = U.UserID
            WHERE U.UserID = ? AND U.isSeller = TRUE
        `;
        const [rows] = await db.query(sql, [sellerId]);
        return rows;
    } catch (error) {
        throw error;
    }
};


export const getListingsByCategory = async (category) => {
    const sql = `SELECT * FROM Listings WHERE Category = ?`;
    const [rows] = await db.query(sql, [category]);
    return rows;
};

export const getAllListings = async () => {
    try {
        const sql = `
            SELECT * 
            FROM Listings
        `;
        const [rows] = await db.query(sql);
        return rows;
    } catch (error) {
        console.error("Error querying the database in getAllListings:", error); // Log the error details
        throw error;
    }
};
