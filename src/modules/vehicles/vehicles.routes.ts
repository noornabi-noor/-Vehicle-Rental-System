import express from "express";
import { vehiclesController } from "./vehicles.controller";


const router = express.Router();

router.post("/", vehiclesController.createVehicles);
router.get("/", vehiclesController.getVehicles);
router.get("/:vehicleId", vehiclesController.getSingleVehicle);
router.put("/:vehicleId", vehiclesController.updateVehicle);
router.delete("/:vehicleId", vehiclesController.deleteVehicle);

export const vehicleRoutes = router;