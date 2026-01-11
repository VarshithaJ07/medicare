import express from "express";
import {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

router.post("/", createDoctor); // Add doctor
router.get("/", getDoctors);    // Get all doctors
router.get("/:id", getDoctor);  // Get one doctor
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

export default router;
