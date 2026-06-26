import mongoose from "mongoose";

const UserSchema =
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
      default: null
    },

    role: {
      type: String,
      enum: [
        "superadmin","admin"
      ],
      default: "admin"
    },

    selectedLocatiom: {
      type: String,
      default: null
    }
  });

export default mongoose.models.User ||
  mongoose.model(
    "User",
    UserSchema
  );