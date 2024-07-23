import { Request, Response } from "express";
import SocialCounts from "../../models/socialcounts";

const createCount = async (req: Request, res: Response) => {
    try {
        const { platform } = req.body;
        if (!platform) {
            return res.sendError(res, "Platform is Required");
        }

        const validPlatforms = [
            'facebook_count',
            'twitter_count',
            'messager_count',
            'reddit_count',
            'whatsapp_count',
            'telegram_count'
        ];

        if (!validPlatforms.includes(platform)) {
            return res.sendError(res, "Invalid Platform");
        }

        const [platformCount] = await SocialCounts.findOrCreate({
            where: {},
            defaults: {}
        });

        await platformCount.increment(platform);

        const updatedPlatformCount = await SocialCounts.findOne({
            where: {}
        });
            return res.sendSuccess(res,{ count: updatedPlatformCount?.[platform] });


    } catch (error: any) {
        console.error('Error retrieving rating:', error);
        return res.sendError(res, error.message);
    }
}

const getCount = async (req: Request, res: Response) => {
    try {
        const validPlatforms = [
            'facebook_count',
            'twitter_count',
            'messager_count',
            'reddit_count',
            'whatsapp_count',
            'telegram_count'
        ];

        const platformCount = await SocialCounts.findOne({
            where: {}
        });

        const counts :any= validPlatforms.reduce((acc:any, platform) => {
            acc[platform] = 0;
            return acc;
        }, {});

        if (platformCount) {
            validPlatforms.forEach(platform => {
                counts[platform] = platformCount[platform] ?? 0;
            });
        }

        return res.sendSuccess(res, counts);

    } catch (error: any) {
        console.error('Error retrieving counts:', error);
        return res.sendError(res, error.message);
    }
};

export { createCount, getCount };
