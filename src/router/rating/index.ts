import { Router } from "express";
import {createRating,getRatings} from "../../controllers/ratings"

const router = Router();
// router.use(accessControl)
router.post("/", createRating);
router.get('/:movieId/:id', getRatings);



export default router;
