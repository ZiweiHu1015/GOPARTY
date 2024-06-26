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
        PersonalizationOptions: personalizationOptions,
        Images: images,
        Options: options,
        UnavailableDates: unavailableDates
    } = listingData;
    
    const sql = `INSERT INTO Listings 
                    (SellerID, Title, Description, Category, Price, CoverImage, AvailableStartDate, AvailableEndDate, DeliveryType, PersonalizationOptions, Images, Options, UnavailableDates)
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
        personalizationOptions || null,
        images ? JSON.stringify(images) : null,
        JSON.stringify(options),
        unavailableDates ? JSON.stringify(unavailableDates) : '[]'
    ];

    console.log("Values to insert:", values);

    const [result] = await db.execute(sql, values);
    try {
        const [result] = await db.execute(sql, values);
        console.log("Insert result:", result); // Debug message
        return result.insertId;
    } catch (error) {
        console.error("Error executing SQL:", error); // Debug message
        throw error;
    }
};

export const getListingById = async (listingId) => {
    const sql = ` SELECT 
            l.*, 
            u.FirstName, 
            u.ProfilePicture,
            YEAR(u.CreatedAt) AS MemberSince,
            s.StoreName,
            s.StoreDescription,
            s.MainService,
            s.ServiceDays,
            s.ServiceArea,
            s.ServiceType
        FROM 
            Listings l
        JOIN 
            Users u ON l.SellerID = u.UserID
        JOIN 
            Sellers s ON l.SellerID = s.UserID
        WHERE 
            l.ProductID = ?`;
    const [rows] = await db.query(sql, [listingId]);
    return rows[0];
};

export const deleteListingById = async (listingId) => {
    const sql = `DELETE FROM Listings WHERE ProductID  = ?`;
    const [result] = await db.execute(sql, [listingId]);
    return result.affectedRows;
};

export const updateListingById = async (listingId, updates) => {
  const { 
    title = null, 
    description = null, 
    category = null, 
    price = null, 
    coverImage = null, 
    images = null, 
    deliveryType = null, 
    personalizationOptions = null, 
    availableStartDate = null, 
    availableEndDate = null,
    options = null,
    UnavailableDates = null
  } = updates;


  const sql = `
    UPDATE Listings SET 
      Title = ?, 
      Description = ?, 
      Category = ?, 
      Price = ?, 
      CoverImage = ?, 
      Images = ?, 
      DeliveryType = ?, 
      PersonalizationOptions = ?, 
      AvailableStartDate = ?, 
      AvailableEndDate = ? ,
      Options = ?,
      UnavailableDates = ?
    WHERE ProductID = ?
  `;
  const values = [
    title, 
    description, 
    category, 
    price, 
    coverImage, 
    JSON.stringify(images), 
    deliveryType, 
    personalizationOptions, 
    availableStartDate, 
    availableEndDate, 
    JSON.stringify(options),
    JSON.stringify(UnavailableDates), 
    listingId
  ];
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
        rows.forEach(row => {
            try {
                if (typeof row.Images === 'string' && row.Images.startsWith('[')) {
                    row.Images = JSON.parse(row.Images);
                } else {
                    row.Images = [];
                }
            } catch (err) {
                row.Images = [];
            }
            try {
                if (typeof row.Options === 'string' && row.Options.startsWith('[')) {
                    row.Options = JSON.parse(row.Options);
                } else {
                    row.Options = [];
                }
            } catch (err) {
                row.Options = [];
            }
        });
        return rows;
    } catch (error) {
        console.error("Error in getListingsBySellerId: ", error);
        throw error;
    }
};


export const getListingsByCategory = async (category) => {
    try {
        const sql = `SELECT * FROM Listings WHERE Category = ?`;
        const [rows] = await db.query(sql, [category]);
         rows.forEach(row => {
            try {
                row.Images = JSON.parse(row.Images || '[]');
            } catch (err) {
                row.Images = [];
            }
            try {
                row.Options = JSON.parse(row.Options || '[]');
            } catch (err) {
                row.Options = [];
            }
        });
        return rows;
    } catch (error) {
        console.error("Error querying the database in getListingsByCategory:", error); // Log the error details
        throw error;
    }
};


export const getAllListings = async () => {
    try {
        const sql = `
            SELECT * 
            FROM Listings
        `;
        const [rows] = await db.query(sql);
        rows.forEach(row => {
            try {
                row.Images = JSON.parse(row.Images || '[]');
            } catch (err) {
                row.Images = [];
            }
            try {
                row.Options = JSON.parse(row.Options || '[]');
            } catch (err) {
                row.Options = [];
            }
        });
        return rows;
    } catch (error) {
        console.error("Error querying the database in getAllListings:", error); // Log the error details
        throw error;
    }
};