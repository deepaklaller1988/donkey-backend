import accessControl from "../../middleware/access-control";
import { createBookmark, getBookmarks } from "../../controllers/bookmarks";
import { Router } from "express";

const router = Router();
// router.use(accessControl)
router.post("/", createBookmark);
router.get("/", getBookmarks);


export default router;
