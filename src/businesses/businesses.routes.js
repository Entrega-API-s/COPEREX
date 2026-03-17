import { Router } from "express";
import {
    registerBusiness,
    fetchBusinesses,
    fetchBusinessById,
    editBusiness,
    filterBySector,
    filterByImpact,
    filterByExperience,
    sortAZ,
    sortZA
} from "./businesses.controller.js";

import { validateJWT } from "../../middlewares/validate-JWT.js";

const router = Router();

router.post("/register", validateJWT, registerBusiness);
router.get("/", validateJWT, fetchBusinesses);
router.get("/:id", validateJWT, fetchBusinessById);
router.put("/edit/:id", validateJWT, editBusiness);

router.get("/sector/:sector", validateJWT, filterBySector);
router.get("/impact/:impact", validateJWT, filterByImpact);
router.get("/experience/:years", validateJWT, filterByExperience);

router.get("/sort/asc", validateJWT, sortAZ);
router.get("/sort/desc", validateJWT, sortZA);

export default router;