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
        .json({ success: false, message: "Very good, you won the game." });
      break;
    case "POST":
      const { email } = req.body;

      try {
        const foundUser = await Users.findOne({ email: email });
        if (!foundUser)
          return res
            .status(404)
            .json({
              success: false,
              message: "No user with given email found.",
            });
        const signInToken = jwt.sign(
          { email: email, requestedAt: Date.now() },
          process.env.EMAIL_SECRET,
          {
            expiresIn: "5m",
          }
        );
        await sendSignInToken(email, signInToken);
        res
          .status(200)
          .json({ success: true, message: `An email was sent to ${email}` });
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
