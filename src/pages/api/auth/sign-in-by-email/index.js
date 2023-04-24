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
      const { email, token } = req.body;
      try {
        const decode = jwt.verify(token, process.env.EMAIL_SECRET);
        console.log(decode);
        const foundUser = await Users.findOne({ email: decode.email });
        //email must be the same email that requested the token
        //user deleted after getting token and before sign in with that token
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
