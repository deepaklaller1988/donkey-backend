import accessControl from "../../middleware/access-control";
import { createUser, forgotPassword, getUsers, loginUser, myDetails, resetPassword, updateUserDetails } from "../../controllers/users/index";
import { Router } from "express";

const router = Router();
router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/update-userdetail", updateUserDetails);
router.get("/get-users", getUsers);

router.use(accessControl)
router.get("/my-details", myDetails);

export default router;
