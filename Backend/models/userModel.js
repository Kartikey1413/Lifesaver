import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      required: [true, "role is required"],
      enum: ["admin", "donor"],
      default: "donor",
    },
    isNewUser: { type: Boolean, default: true }, // Default to true for new users

    password: {
      type: String,
      required: [true, "password is required"],
    },
    confirmPassword: {
      type: String,
      required: [true, "confirm password is required"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords do not match",
      },
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

export default mongoose.model("User", userSchema);
