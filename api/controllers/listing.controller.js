import {
    createListing,
    getListingById,
    deleteListingById,
    updateListingById,
    getListingsBySellerId,
    getListingsByCategory,
    getAllListings
  } from '../models/listing.model.js';
  import createError from '../utils/createError.js';
  
  export const createlisting = async (req, res, next) => {
    if (!req.isSeller) {
        console.log("userdata:isSeller", req.isSeller, "userid:", req.userId);
        return next(createError(403, "Only sellers can create a listing!"));
    }

    // Ensure that the userId is mapped to SellerID as expected by the database
    const listingData = {
        SellerID: req.userId,
        ...req.body
    };

    try {
        // Create the listing and get the ProductID of the newly created listing
        const productId = await createListing(listingData);
        // Retrieve the newly created listing by its ProductID
        const newListing = await getListingById(productId);
        res.status(201).send(newListing);
    } catch (error) {
        console.log("Error details:", error);
        next(createError(500, "Server error while creating listing"));
    }
};

  
  export const deleteListing = async (req, res, next) => {
    try {
      const listing = await getListingById(req.params.id);
      if (!listing) {
        return next(createError(404, "Listing not found"));
      }
  
      if (listing.SellerID !== req.userId) {
        console.log("databse.userid: ", listing.UserID + "user.userid:",req.userId );
        return next(createError(403, "You can delete only your listing!"));
      }
  
      await deleteListingById(req.params.id);
      res.status(200).send("Listing has been deleted!");
    } catch (error) {
      next(createError(500, "Server error while deleting listing"));
    }
  };
  
  export const getListing = async (req, res, next) => {
    try {
      const listing = await getListingById(req.params.id);
      if (!listing) {
        return next(createError(404, "Listing not found"));
      }
      res.status(200).send(listing);
    } catch (error) {
      next(createError(500, "Server error while retrieving listing"));
    } 
  };
  
  export const getListings = async (req, res, next) => {//untested
    try {
      let listings;
      if (req.query.userId) {
        listings = await getListingsBySellerId(req.query.userId);

      } else if (req.query.cat) {
        listings = await getListingsByCategory(req.query.cat);
      } else {
        // Implement a more general find method if needed
        listings = await getAllListings(); // This function needs to be implemented in model
      }
      res.status(200).send(listings);
    } catch (error) {
      next(createError(500, "Server error while retrieving listings"));
    }
  };
  

  export const updateListing = async (req, res, next) => {//untested
    const { id } = req.params;
    try {
      const listing = await getListingById(id);
      if (!listing) {
        return next(createError(404, "Listing not found"));
      }
  
      if (listing.userId !== req.userId) {
        return next(createError(403, "You are only allowed to update your own listings"));
      }
  
      const { title, desc, color, size, cat, price, cover, images, deliveryType, features, personalization } = req.body;
      const updates = { title, desc, color, size, cat, price, cover, images, deliveryType, features, personalization };
  
      const result = await updateListingById(id, updates);
      if (result === 0) {
        return next(createError(404, "No updates were made to the listing"));
      }
  
      const updatedListing = await getListingById(id);
      res.status(200).send(updatedListing);
    } catch (error) {
      next(createError(500, "Server error while updating listing"));
    }
  };
  