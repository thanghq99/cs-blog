import dbConnect from "@/src/db/mongooseConnector";
import Updates from "@/src/db/models/Updates";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        let { page, pageSize } = req.query;
        page = +page;
        pageSize = +pageSize;
        const count = await Updates.countDocuments({});
        const updatesList = await Updates.find({})
          .limit(pageSize)
          .skip(page * pageSize)
          .sort({ date: -1 });
        console.log("get updates api called");
        res.status(200).json({
          success: true,
          data: updatesList,
          count: count,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const update = await Updates.create(req.body);
        res.status(200).json({ success: true, data: update });
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
