import mongoose from "mongoose";

const UpdatesSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
});

export default mongoose.models.Updates ||
  mongoose.model("Updates", UpdatesSchema);
