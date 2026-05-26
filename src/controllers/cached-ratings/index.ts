import { Request, Response } from "express";
import IMDBRating from "../../models/imdb-rating.model";
import moment from "moment";

const apiKey = process.env.NEXT_PUBLIC_MDBKEY;

const getCachedRatings = async (req: Request, res: Response) =>{
    const { mediaId, mediaType }: any = req.query;
    try {
        if (!mediaId || !mediaType) {
            console.log("Media Id or Media Type is missing")
            return res.sendError(res, "Media Id or Media Type is missing");
        }
        if (!mediaId || !mediaType) {
            console.log("Media Id or Media Type is missing")
            return res.sendError(res, "Media Id or Media Type is missing");
        }

        const findRating = await IMDBRating.findOne({
            where:{
                media_id: mediaId,
                media_type: mediaType
            }
        });

        if(findRating){
            const cachedAt = moment(findRating.cached_date);
            const now = moment();

            // Check if data is still within the 2-day validity period
            if (now.diff(cachedAt, 'days') < 2) {
                console.log('Serving from cache');
                return res.sendSuccess(res, findRating);
            }else{
                const data = await getRatingFromMDBAPI(mediaId, mediaType);
                if (data !== null && data !== undefined) {
                    let update = {
                        imdb_rating : Number(data),
                        cached_date: now
                    }

                    await IMDBRating.update(update, {
                        where: { id: findRating.id }
                    })
                }
                console.log('Refetch Data from MDB after 2 days');
                return res.sendSuccess(res, {
                    ...findRating.dataValues,
                    imdb_rating : data ? data : findRating?.dataValues?.imdb_rating
                })
            }
        }else{
            const data = await getRatingFromMDBAPI(mediaId, mediaType);
            if (data !== null && data !== undefined){
                let update = {
                    media_id: Number(mediaId),
                    media_type: mediaType ? mediaType.toLowerCase() : mediaType,
                    imdb_rating : Number(data),
                    cached_date: Date.now()
                }

                const imdbrating = await IMDBRating.create(update);
                console.log('Cached Rating in server');
                return res.sendSuccess(res, imdbrating);
            }
            console.log('Rating not found');
            return res.sendSuccess(res, {
                imdb_rating : data
            })
        }     
    } catch (error: any) {
        console.log(error)
        return res.sendError(res, error.message);
    }
}

const getRatingFromMDBAPI = async (mediaId: any, mediaType: any) =>{
    try {
        let imdbRating = null;
    // const response = await fetch(`https://mdblist.com/api/?apikey=${apiKey}&tm=${mediaId}&m=${mediaType.toLowerCase() ==='movie' ? 'movie' : 'show'}`);
    const response = await fetch(
    `https://api.mdblist.com/tmdb/${
        mediaType.toLowerCase() === "movie" ? "movie" : "show"
    }/${mediaId}?apikey=${apiKey}`,
    {
        headers: {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        "Accept": "application/json",
        "Referer": "https://mdblist.com/",
        "Origin": "https://mdblist.com"
        }
    }
    );
     console.log("resposne----------",mediaId, mediaType, response)
     if (!response.ok) {
        console.log("MDB Error:", response.status);
        return null;
    }
    const contentType = response.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
    return null;
    }
    const ratingData = await response.json();
    console.log("ratingData-----",ratingData)
    if(ratingData){
        if(ratingData.ratings && ratingData.ratings.length > 0){
        const imdb = ratingData?.ratings?.find(
            (rating: any) => rating.source === "imdb"
            );

            imdbRating = imdb?.value || null;
        }
      }
      return imdbRating;
    } catch (error) {
        console.error(`Failed to fetch certificate for movie ID ${mediaId}:`, error);
        return null;
    }
}

export {getCachedRatings}