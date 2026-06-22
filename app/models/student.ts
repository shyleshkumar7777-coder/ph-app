import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    wphId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    basic: {
      type: Boolean,
      default: false,
    },
    advanced: {
      type: Boolean,
      default: false,
    },
    psychotherapy: {
      type: Boolean,
      default: false,
    },
    location: {
    type: String,
    required: true,
}
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);