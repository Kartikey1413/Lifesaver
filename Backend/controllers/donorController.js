import Donor from "../models/donorModel.js";

// Controller to handle Donor-related operations
const donorController = {
  // Create Donor
  createDonor: async (req, res) => {
    try {
      const {
        fullname,
        phone,
        age,
        gender,
        bloodGroup,
        street,
        city,
        state,
        country,
        pincode,
        photo,
      } = req.body;

      const newDonor = new Donor({
        fullname,
        phone,
        age,
        gender,
        bloodGroup,
        street,
        city,
        state,
        country,
        pincode,
        photo,
      });
      await newDonor.save();

      res
        .status(201)
        .json({ message: "Donor created successfully", data: newDonor });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // Get all donors
  getAllDonors: async (req, res) => {
    const page = parseInt(req.query.page);
    try {
      const donors = await Donor.find()
        .sort({ createdAt: -1 })
        .populate("reviews")
        .skip(page * 12)
        .limit(12);

      res.status(200).json({
        success: true,
        data: donors,
        count: donors.length,
        message: "donors fetched successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching donors",
        error: error.message,
      });
    }
  },

  // Get a single Donor by ID
  getDonorById: async (req, res) => {
    try {
      const donorId = req.params.id;
      const donor = await Donor.findById(donorId).populate("reviews");
      if (!donor) {
        return res.status(404).json({
          success: false,
          message: "Donor not found",
        });
      }
      res.status(200).json({
        success: true,
        data: donor,
        message: "Donor fetched successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching Donor",
        error: error.message,
      });
    }
  },

  // Update an existing Donor
  updateDonor: async (req, res) => {
    try {
      const donorId = req.params.id;
      const {
        fullname,
        phone,
        age,
        gender,
        bloodGroup,
        street,
        city,
        state,
        country,
        pincode,
        photo,
      } = req.body;

      const updateddonor = await Donor.findByIdAndUpdate(
        donorId,
        {
          fullname,
          phone,
          age,
          gender,
          bloodGroup,
          street,
          city,
          state,
          country,
          pincode,
          photo,
        },
        { new: true }
      );

      if (!updateddonor) {
        return res.status(404).json({
          success: false,
          message: "Donor not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Donor updated successfully",
        data: updateddonor,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating Donor",
        error: error.message,
      });
    }
  },

  // Delete a Donor
  deleteDonor: async (req, res) => {
    try {
      const donorId = req.params.id;
      const deleteddonor = await Donor.findByIdAndDelete(donorId);
      if (!deleteddonor) {
        return res.status(404).json({
          success: false,
          message: "Donor not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Donor deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting Donor",
        error: error.message,
      });
    }
  },

  // Get donors by search
  getDonorBysearch: async (req, res) => {
    try {
    const { location, city, bloodGroup } = req.query;
    const searchCity = location || city;

    // Validation
    if (!searchCity && !bloodGroup) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one search parameter (city or blood group).",
      });
    }

    const searchCriteria = {};

    if (searchCity) {
      const regex = /^[a-zA-Z\s]+$/;
      if (!regex.test(searchCity)) {
        return res.status(400).json({
          success: false,
          message: "City/location should only contain letters and spaces.",
        });
      }
      searchCriteria.$or = [
        { city: { $regex: new RegExp(`${searchCity}`, "i") } },
        { state: { $regex: new RegExp(`${searchCity}`, "i") } },
      ];
    }

    if (bloodGroup) {
      searchCriteria.bloodGroup = bloodGroup;
    }

    const matchingDonors = await Donor.find(searchCriteria).populate("reviews");

    if (matchingDonors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No matching donors found.",
      });
    }

    res.status(200).json({
      success: true,
      data: matchingDonors,
      count: matchingDonors.length,
      message: "Donors fetched successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching donors.",
      error: error.message,
    });
  }
  },

  // Get Donor count
  getDonorCount: async (req, res) => {
    try {
      const count = await Donor.countDocuments();
      res.status(200).json({
        success: true,
        count,
        message: "Donor count fetched successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching Donor count",
        error: error.message,
      });
    }
  },
};

export default donorController;
