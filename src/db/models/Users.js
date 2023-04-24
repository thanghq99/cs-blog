import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  alias: {
    type: String,
    required: [true, "Alias is required"],
  },
  isAdmin: {
    type: Boolean,
    required: [true, "Admin status is required"],
    default: false,
  },
});

export default mongoose.models.Users || mongoose.model("Users", UsersSchema);
