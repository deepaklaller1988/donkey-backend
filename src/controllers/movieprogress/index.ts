import { Request, Response } from "express";
import MovieProgress from "../../models/movieprogress";

const postContinue = async (req: Request, res: Response) => {
  const { user_id, media_id, media_type, progress_time ,season_id,episode_id} = req.body;

  if (!user_id && !media_id && !media_type && !progress_time) {
    return res.sendError(res, "userId, MediaId, mediaType, and progressTime are required.");
  }
  try {
    const existingProgress = await MovieProgress.findOne({ where: { user_id, media_id, media_type } });
    if (existingProgress) {
      existingProgress.progress_time = progress_time;
      if (media_type === 'tv') {
        existingProgress.season_id = season_id;
        existingProgress.episode_id = episode_id;
      }
      await existingProgress.save();
      return res.sendSuccess(res, existingProgress);

    } else {
      const newProgress = await MovieProgress.create({
        user_id,
        media_id,
        media_type,
        progress_time,
        status: true,
        ...(media_type === 'tv' && { season_id, episode_id }),

      });
      return res.sendSuccess(res, newProgress);
    }

  } catch (error: any) {
    console.error('Error saving progress:', error);
    return res.sendError(res, error.message);
  }
}

const getContinue = async (req: Request, res: Response) => {
  const sortOrder = req.query.sort || 'desc';
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const { user_id } = req.query;
  if (!user_id) {
    return res.sendError(res, "userId is Required.");

  }

  try {
    const {rows,count} = await MovieProgress.findAndCountAll({
      where: { user_id:user_id },
      order: [['updatedAt', 'desc']],
      limit:limit,
      offset:offset
    });

    return res.sendPaginationSuccess(res, rows,count);

  } catch (error: any) {
    return res.sendError(res, error.message);
  }
}

const getContinueFortv = async (req: Request, res: Response) => {
  const { user_id, media_type, media_id } = req.query;

  try {
    const userProgress = await MovieProgress.findAll({
      where: {
        user_id: user_id,
        media_type: media_type,
        media_id: media_id ,
        
      }
    });

    if (userProgress.length === 0) {
      return res.sendSuccess(res,{ message: 'No progress found for this user' });

    }
    return res.sendSuccess(res,userProgress);

  } catch (error: any) {
    console.error("Error fetching user progress:", error);
    return res.sendError(res, error.message);

  }
};



const deleteContinue = async (req: Request, res: Response) => {
  try {

    const data = await MovieProgress.destroy({
      where: {
        user_id: req.body.userId,
        media_id: typeof(req.body.mediaId) === 'string' ? req.body.mediaId : req.body.mediaId.toString(),
        media_type: req.body.mediaType,
      },
    });
    res.sendSuccess(res, data);
  } catch (error: any) {
    return res.sendError(res, error.message);
  }
}

export { postContinue, getContinue, deleteContinue ,getContinueFortv}