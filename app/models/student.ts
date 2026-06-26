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
    course: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
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