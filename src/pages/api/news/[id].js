import dbConnect from "@/src/db/mongooseConnector";
import News from "@/src/db/models/News";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const news = await News.findById(id);
        if (!news) res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: news });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        // body contains title, description, imageUrl, content, publishable. viewCount will be not be modified here
        const updatedNews = await News.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedNews) res.status(200).json({ success: false });
        res.status(200).json({ success: true, data: updatedNews });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const deletedNews = await News.findByIdAndDelete(id);
        if (!deletedNews) res.status(200).json({ success: false });
        res.status(200).json({ success: true, data: deletedNews });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
