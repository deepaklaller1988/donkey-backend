import accessControl from "../../middleware/access-control";
import { createBookmark, deleteBookmark, getBookmarks, updateBookmark } from "../../controllers/bookmarks";
import { Router } from "express";

const router = Router();
// router.use(accessControl)
router.post("/", createBookmark);
router.get("/", getBookmarks);
router.put("/", updateBookmark);
router.delete("/", deleteBookmark);


export default router;
