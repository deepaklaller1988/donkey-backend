import { getCachedRatings } from "../../controllers/cached-ratings";
import { Router } from "express";

const router = Router();
// router.use(accessControl)
router.get("/imdb-rating", getCachedRatings);

export default router;