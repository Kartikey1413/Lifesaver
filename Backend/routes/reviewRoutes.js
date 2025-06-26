import express from 'express';
import { createReview, deleteReview } from '../controllers/reviewController.js';
import { verifyUser } from '../middlewares/authMiddelware.js';
const router = express.Router();


// Create a new review
router.post('/:donorId', verifyUser, createReview);

// Delete a review by ID
router.delete('/:id', verifyUser, deleteReview);

export default router;
