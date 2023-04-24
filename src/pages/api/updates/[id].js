import dbConnect from "@/src/db/mongooseConnector";
import Updates from "@/src/db/models/Updates";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const update = await Updates.findById(id);
        if (!update) res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: update });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const updatedUpdate = await Updates.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedUpdate) res.status(200).json({ success: false });
        res.status(200).json({ success: true, data: updatedUpdate });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const deletedUpdate = await Updates.findByIdAndDelete(id);
        if (!deletedUpdate) res.status(200).json({ success: false });
        res.status(200).json({ success: true, data: deletedUpdate });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
