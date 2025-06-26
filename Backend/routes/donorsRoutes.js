import express from "express";
import donorController from "../controllers/donorController.js";
import { verifyAdmin, verifyToken, verifyUser, } from "../middlewares/authMiddelware.js";

const router = express.Router();


router.get("/all-donors", verifyToken, verifyAdmin, donorController.getAllDonors);
router.post("/create/:id", verifyToken, verifyUser, donorController.createDonor);
router.get("/search", donorController.getDonorBysearch);
router.get("/count", donorController.getDonorCount);
router.post("/:id", donorController.getDonorById);
router.put("/update/:id", verifyToken, verifyUser,verifyAdmin, donorController.updateDonor);
router.delete("/delete/:id", verifyToken, verifyUser, verifyAdmin, donorController.deleteDonor);

export default router;