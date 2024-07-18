import { Request, Response } from "express";
import { Op } from "sequelize";
import Ratings from "../../models/ratings.model"

const createRating = async (req: Request, res: Response) => {
    const { value, movieId, userId } = req.body;
    if (value < 0.5 || value > 5) {
        return res.sendError(res, "Invalid rating value. Must be between 1 and 5.");
    }

    try {
        const existingRating = await Ratings.findOne({
            where: {
                userId,
                movieId
            }
        });

        if (existingRating) {
            return res.sendError(res, "You have already rated this movie");

        }

        const newRating = await Ratings.create({
            movieId,
            value,
            ipAddress: req.ip,
            userId: userId ? userId : null,
        });

        return res.sendSuccess(res, newRating);
    } catch (error: any) {
        console.error('Error saving rating:', error);
        return res.sendError(res, error.message);
    }

}

const getRatings = async (req: Request, res: Response) => {
    const { movieId, userId ,ip} = req.params
    console.log(userId,"==")
    
    try {
        let rating;

        const whereCondition = {
            movieId,
            [Op.or]: [
                { userId: userId || null }, 
                { ipAddress: ip || null }    
            ]
        };

        rating = await Ratings.findOne({
            where: whereCondition
        });

        if (!rating) {
            return res.sendError(res, "Rating Not Found")

        }

        return res.sendSuccess(res, { rating });
    } catch (error: any) {
        console.log(error,"=========")
        return res.sendError(res, "You have already rated this movie");

    }

}

export { createRating, getRatings }
