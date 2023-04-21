import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    maxLength: [60, "Title must be less than 60 characters"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    maxLength: [200, "Description must be less than 60 characters"],
  },
  thumbnail: {
    type: String,
    required: [true, "Thumbnail image url is required"],
  },
  backgroundImage: {
    type: String,
    required: [true, "Background image url is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  publishable: {
    type: Boolean,
    required: [true, "Publishing status is required"],
    default: false,
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  viewCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.News || mongoose.model("News", NewsSchema);
