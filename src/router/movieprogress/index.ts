import {getListofWatching, postData} from "../../controllers/movieprogress";
import { Router } from "express";

const router = Router();
// router.use(accessControl)
router.get("/", getListofWatching);
router.post('/', postData);



export default router;
