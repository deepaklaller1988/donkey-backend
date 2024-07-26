import { Request, Response } from "express";
import MovieProgress from "../../models/movieprogress";

const getMovieData = async (req: Request, res: Response) => {
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
  const { user_id } = req.query;

  if (!user_id) {
    return res.sendError(res, "userId is Required.");

  }

  try {
    const watchingList = await MovieProgress.findAll({
      where: { user_id, status: true },
      order: [['progress_time', 'DESC']]
    });

    if (watchingList.length === 0) {
    return res.sendError(res, "No watching progress found.");

    }
    return res.sendSuccess(res, watchingList);

  } catch (error: any) {
    return res.sendError(res, error.message);
  }
}

export { getListofWatching, getMovieData }