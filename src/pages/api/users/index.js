import dbConnect from "@/src/db/mongooseConnector";
import Users from "@/src/db/models/Users";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        let { page, pageSize } = req.query;
        page = +page;
        pageSize = +pageSize;
        const count = await Users.countDocuments({});
        const usersList = await Users.find({})
          .limit(pageSize)
          .skip(page * pageSize)
          .sort({ date: -1 });
        console.log("get users api called");
        res.status(200).json({
          success: true,
          data: usersList,
          count: count,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { email } = req.body;
        const existingUser = await Users.findOne({ email: email });
        if (existingUser) {
          return res.status(409).json({
            success: false,
            message: "Email has been used",
          });
        }
        const user = await Users.create(req.body);
        res.status(200).json({ success: true, data: user });
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
