import { Router } from "express";
import {createCount,getCount} from "../../controllers/socialcounts"

const router = Router();
// router.use(accessControl)
router.post("/", createCount);
router.get('/', getCount);



export default router;
