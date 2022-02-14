import { Router } from "express";
import { login, register, users } from "../Controllers/AuthControllers";
import authenticate from "../MiddleWare/autheticate";
const router = Router();

//Auth Routes
router.route("/login").post(login);
router.route("/register").post(register);
router.use(authenticate);
router.route("/users").get(users);

export default router;
