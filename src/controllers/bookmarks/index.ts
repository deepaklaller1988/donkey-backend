import { Request, Response } from "express";
import User from "../../models/user.model";
import BookMarks from "../../models/bookmark.model";


const createBookmark = async (req: Request, res: Response) => {
    try {
      const isExist = await BookMarks.findOne({
        where: {
          user_id: req.body.userId,
          media_id: typeof(req.body.mediaId) === 'string' ? req.body.mediaId : req.body.mediaId.toString(),
          media_type: req.body.mediaType,
        }
      })

      if(isExist){
        return res.sendError(res, "It's already exist in bookmarks.");
      }
      const data = {
        user_id: req.body.userId,
        media_id: req.body.mediaId,
        media_type: req.body.mediaType,
        bookmark_type: req.body.bookmarkType,
        imdb_id: req.body.imdbId,
      }

      const bookmark = await BookMarks.create(data);
      return res.sendSuccess(res,  bookmark );
    } catch (error: any) {
      console.log(error);
      return res.sendError(res, error.message);
    }
  };

  const getBookmarks = async (req: Request, res: Response) => {
    const searchTerm = req.query.search || '';
    const bookmarkType = req.query.bookmarkType || '';
    const sortOrder = req.query.sort || 'desc';
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const whereCondition: any = {};
    try {

        if (bookmarkType) {
            whereCondition.bookmark_type = bookmarkType;
        }

        if (!req.query.userId || req.query.userId == 'undefined') {
            return res.sendError(res, "User ID missing");
        }
        
        if (req.query.pagination === "true") {
            const { count, rows } = await BookMarks.findAndCountAll({
                where: {
                    ...whereCondition,
                    user_id: req.query.userId
                },
                order: [
                    ['id', sortOrder], // Sort the results based on the 'username' field and the specified order
                ],
                offset: offset,
                limit: limit
            });
            return res.sendPaginationSuccess(res, rows, count);
        } else {
            const bookMarks = await BookMarks.findAll({
                where: {
                    ...whereCondition,
                    user_id: req.query.userId
                },
                order: [
                    ['id', sortOrder], // Sort the results based on the 'username' field and the specified order
                ],
            });
            return res.sendSuccess(res,  bookMarks);
        }
    } catch (error: any) {
      console.log(error);
      return res.sendError(res, error.message);
    }
  };


  const updateBookmark = async (req: Request, res: Response) => {
    try {
      const data = {
        bookmark_type: req.body.bookmarkType,
      }

      const bookmark = await BookMarks.update(data, {
        where:{
          user_id: req.body.userId,
          media_id: typeof(req.body.mediaId) === 'string' ? req.body.mediaId : req.body.mediaId.toString(),
          media_type: req.body.mediaType,
        }
      });
      return res.sendSuccess(res,  bookmark );
    } catch (error: any) {
      console.log(error);
      return res.sendError(res, error.message);
    }
  };


  const deleteBookmark = async (req: Request, res: Response) => {
    try {
      const bookmark = await BookMarks.destroy({
        where:{
          user_id: req.body.userId,
          media_id: typeof(req.body.mediaId) === 'string' ? req.body.mediaId : req.body.mediaId.toString(),
          media_type: req.body.mediaType,
        }
    });
      return res.sendSuccess(res,  bookmark );
    } catch (error: any) {
      console.log(error);
      return res.sendError(res, error.message);
    }
  };


export {createBookmark, getBookmarks, updateBookmark, deleteBookmark}