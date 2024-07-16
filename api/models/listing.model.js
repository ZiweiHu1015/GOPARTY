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
                    (SellerID, Title, Description, Category, Price, CoverImage, AvailableStartDate, AvailableEndDate, DeliveryType, PersonalizationOptions, Images, UnavailableDates)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
        unavailableDates ? JSON.stringify(unavailableDates) : '[]'
    ];

    console.log("Values to insert:", values);

    const [result] = await db.execute(sql, values);
    try {
        const [result] = await db.execute(sql, values);
        const listingId = result.insertId; // Changed: store the insertId of the listing

        if (options && options.length > 0) { // Changed: check if options are provided
            const optionPromises = options.map(option => { // Changed: iterate over options
                const optionSql = `INSERT INTO Options (ListingID, Name, Price) VALUES (?, ?, ?)`; // Changed: SQL for inserting options
                return db.execute(optionSql, [listingId, option.name, option.price]); // Changed: execute the SQL for each option
            });
            await Promise.all(optionPromises); // Changed: wait for all option insertions to complete
        }

        return listingId;
    } catch (error) {
        console.error("Error executing SQL:", error); // Debug message
        throw error;
    }
};


export const getListingById = async (listingId) => {
    // Query to fetch listing details
    const sql = `
        SELECT 
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

    // Query to fetch options based on ListingID
    const optionsSql = `SELECT Name, Price FROM Options WHERE ListingID = ?`;

    try {
        // console.log("Executing listing query with ProductID:", listingId);
        // Fetch listing details
        const [listingRows] = await db.query(sql, [listingId]);
        console.log("Listing query result:", listingRows);

        if (listingRows.length === 0) {
            console.error(`Listing with ID ${listingId} not found`);
            throw new Error(`Listing with ID ${listingId} not found`);
        }

        const listing = listingRows[0];

        console.log("Executing options query with ListingID:", listingId);
        // Fetch options
        const [optionRows] = await db.query(optionsSql, [listingId]);
        console.log("Options query result:", optionRows);

        // Combine listing details and options
        listing.Options = optionRows;

        console.log("Final listing object:", listing);
        return listing;
    } catch (error) {
        console.error("Error fetching listing:", error);
        throw error;
    }
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