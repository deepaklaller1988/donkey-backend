import { Request, Response } from "express";
import { Op, Sequelize } from "sequelize";
import Ratings from "../../models/ratings.model"

const createRating = async (req: Request, res: Response) => {
    const { value, movieId, userId, ip ,mediaType} = req.body;

    if (value < 0.5 || value > 5) {
        return res.sendError(res, "Invalid rating value. Must be between 1 and 5.");
    }

    try {
        const existingRating = await Ratings.findOne({
            where: {
                userId,
                movieId,
                mediaType
            }
        });

        if (existingRating) {
            return res.sendError(res, "You have already rated this movie");
        }

        const newRating = await Ratings.create({
            movieId,
            value,
            ipAddress: ip,
            userId: userId ? userId : null,
            mediaType
        });

        return res.sendSuccess(res, newRating);
    } catch (error: any) {
        console.error('Error saving rating:', error);
        return res.sendError(res, error.message);
    }

}

const getRatings = async (req: Request, res: Response) => {
    const { movieId, id, ip ,mediaType } = req.query;

    try {
        let whereCondition: any = {};

        if (movieId) {
            whereCondition.movieId = movieId;
        }
        if (mediaType) {
            whereCondition.mediaType = mediaType;
        }
        if (ip) {
            whereCondition.ipAddress = {
                [Op.like]: '%' + ip + '%'
            };
        }
        else if (id !== "null") {
            whereCondition.userId = String(id);
        }

        const rating = await Ratings.findOne({
            where: whereCondition
        });


        if (!rating) {
            return res.sendSuccess(res, {rating:0});
        }

        let ratingCount = await Ratings.findOne({
            attributes: [
                [Sequelize.fn('AVG', Sequelize.literal("CAST(value AS INTEGER)")), 'rating'],
                [Sequelize.fn('COUNT', Sequelize.literal('DISTINCT id')), 'total'],

        ]})

        return res.sendSuccess(res, { rating ,ratingCount});
    } catch (error: any) {
        console.error('Error retrieving rating:', error);
        return res.sendError(res, error.message);
    }
};

export { createRating, getRatings }
