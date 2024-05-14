import express from 'express';
import { verifyToken } from "../middleware/jwt.js";
import {createlisting, deleteListing, updateListing, getListing,getListings} from '../controllers/listing.controller.js';

const router = express.Router();

// Define listing routes
router.post('/', verifyToken, createlisting);
router.delete('/:id',verifyToken, deleteListing);
router.get('/:id', getListing);
router.get('/', getListings);
router.put('/:id', verifyToken, updateListing);


export default router;
