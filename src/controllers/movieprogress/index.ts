import { Request, Response } from "express";
import MovieProgress from "../../models/movieprogress";

const postData = async (req: Request, res: Response) => {
    const { user_id, media_id, media_type, progress_time } = req.body;

    if (user_id && media_id && media_type && progress_time) {
        return res.sendError(res, "userId,MediaId,type is Required");
    }
    try {
       const data= await MovieProgress.create({
            user_id: user_id,
            media_id: media_id,
            media_type: media_type,
            progress_time: progress_time,
            status: true,
          });
          console.log(data,"data")
          return res.sendSuccess(res, data);

        } catch (error:any) {
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