import dbConnect from "@/src/db/mongooseConnector";
import Users from "@/src/db/models/Users";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const user = await Users.findById(id);
        if (!user) res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const { email } = req.body;
        const existingUser = await Users.findOne({ email: email });
        if (existingUser) {
          return res.status(409).json({
            success: false,
            error: "Conflict email",
            message: "Email has been used",
          });
        }
        const updatedUser = await Users.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedUser) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: updatedUser });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const deletedUser = await Users.findByIdAndDelete(id);
        if (!deletedUser) res.status(400).json({ success: false });
        return res.status(200).json({ success: true, data: deletedUser });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
