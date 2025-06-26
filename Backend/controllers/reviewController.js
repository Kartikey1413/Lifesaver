import Review from '../models/Review.js';
import Donor from '../models/donorModel.js'

const createReview = async (req, res) => {
  try {
    const { username, rating, reviewText } = req.body;
    const donorId = req.params.donorId;

    // Validate required fields
    if (!donorId || !rating) {
      return res.status(400).json({ message: 'Donor ID and rating are required' });
    }

    // Find the corresponding Donor
    const donor = await Donor.findById(donorId);

    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    // Create a new review
    const newReview = new Review({ donorId, reviewText, rating, username });
    await newReview.save();

    // Update the Donor with the new review
    Donor.reviews.push(newReview._id);
    await Donor.save();

    res.status(201).json({ success: true, message: 'Review created successfully', newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a review by ID
const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    // Validate review ID
    if (!reviewId) {
      return res.status(400).json({ message: 'Review ID is required' });
    }

    // Find and delete the review
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { createReview, deleteReview };
