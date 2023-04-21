import dbConnect from "@/src/db/mongooseConnector";
import News from "@/src/db/models/News";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        let { page, pageSize, publishable } = req.query;
        page = +page;
        pageSize = +pageSize;
        let publishableFilter = {};
        if (publishable == "true" || publishable == "false") {
          publishableFilter = { publishable: publishable === "true" };
        }
        const count = await News.countDocuments(publishableFilter);
        const newsList = await News.find(publishableFilter)
          .limit(pageSize)
          .skip(page * pageSize)
          .sort({ date: -1 });
        console.log("get news api called");
        res.status(200).json({
          success: true,
          data: newsList,
          count: count,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        // body contains title, description, imageUrl, content. publishable and viewCount will be default
        const news = await News.create(req.body);
        res.status(200).json({ success: true, data: news });
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
