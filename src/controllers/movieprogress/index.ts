import { Request, Response } from "express";
import MovieProgress from "../../models/movieprogress";

const postData = async (req: Request, res: Response) => {
  const { user_id, media_id, media_type, progress_time } = req.body;

  if (!user_id && !media_id && !media_type && !progress_time) {
    return res.sendError(res, "userId, MediaId, mediaType, and progressTime are required.");
  }
  try {
    const existingProgress = await MovieProgress.findOne({ where: { user_id, media_id } });
    if (existingProgress) {
      existingProgress.progress_time = progress_time;
      await existingProgress.save();
      return res.sendSuccess(res, existingProgress);

    } else {
      const newProgress = await MovieProgress.create({
        user_id,
        media_id,
        media_type,
        progress_time,
        status: true,
      });
      return res.sendSuccess(res, newProgress);
    }

  } catch (error: any) {
    console.error('Error saving progress:', error);
    return res.sendError(res, error.message);
  }

}

const getListofWatching = async (req: Request, res: Response) => {
  try {

  }
  catch (error: any) {

  }

}
export { getListofWatching, postData }