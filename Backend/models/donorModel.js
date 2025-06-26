import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    role: {
      type: String,
      default: "donor",
    },

    age: {
      type: Number,
      required: true,
      min: [18, "Age must be at least 18"],
      max: [65, "Age must be less than 65"],
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
      message: "Invalid",
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      message: "Invalid blood group",
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    photo: {
      type: String, // URL to profile photo file
    },
    reviews: {
      type: mongoose.Types.ObjectId,
      ref: "Review",
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Donor", donorSchema);
