import Users from "@/src/db/models/Users";
import dbConnect from "@/src/db/mongooseConnector";
import sendSignInToken from "@/src/utils/sendSignInToken";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      res
        .status(400)
        .json({ success: false, data: "Very good, you won the game, again." });
      break;
    case "POST":
      const { token } = req.body;
      try {
        const decode = jwt.verify(token, process.env.EMAIL_SECRET);
        const foundUser = await Users.findOne({ email: decode.email });
        if (!foundUser)
          return res
            .status(404)
            .json({ success: false, data: "No user with given email found." });
        res.status(200).json({ success: true, data: foundUser });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
