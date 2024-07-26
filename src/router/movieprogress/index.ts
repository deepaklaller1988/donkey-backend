import {deleteContinue, getContinue, postContinue,} from "../../controllers/movieprogress";
import { Router } from "express";

const router = Router();
// router.use(accessControl)
router.get("/", getContinue);
router.post('/', postContinue);
router.delete('/', deleteContinue);



export default router;
