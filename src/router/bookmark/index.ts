import accessControl from "../../middleware/access-control";
import { createBookmark } from "../../controllers/bookmarks";
import { Router } from "express";

const router = Router();
// router.use(accessControl)
router.post("/", createBookmark);


export default router;
