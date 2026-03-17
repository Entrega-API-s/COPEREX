import { Router } from "express";
import { exportBusinessReport } from "./reports.controller.js";
import { validateJWT } from "../../middlewares/validate-JWT.js";

const router = Router();

router.get("/export", validateJWT, exportBusinessReport);

export default router;