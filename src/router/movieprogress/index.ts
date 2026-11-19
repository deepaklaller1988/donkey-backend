import {deleteContinue, getContinue, getContinueFortv, postContinue,} from "../../controllers/movieprogress";
import { Router } from "express";

const router = Router();
// router.use(accessControl)
router.get("/", getContinue);
router.get("/tv", getContinueFortv);
router.post('/', postContinue);
router.delete('/', deleteContinue);



export default router;
