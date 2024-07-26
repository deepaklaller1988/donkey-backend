import {getListofWatching, getMovieData,} from "../../controllers/movieprogress";
import { Router } from "express";

const router = Router();
// router.use(accessControl)
router.get("/", getListofWatching);
router.post('/', getMovieData);



export default router;
