import { createUser, forgotPassword, getUsers, loginUser, resetPassword } from "../../controllers/users/index";
import { Router } from "express";

const router = Router();
router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/user", getUsers);

export default router;
