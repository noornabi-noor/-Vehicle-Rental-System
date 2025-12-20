import express from "express";
import { vehiclesController } from "./vehicles.controller";
import auth from "../../middleware/auth";


const router = express.Router();

router.post("/", auth("admin"), vehiclesController.createVehicles);
router.get("/", vehiclesController.getVehicles);
router.get("/:vehicleId", vehiclesController.getSingleVehicle);
router.put("/:vehicleId", auth("admin"), vehiclesController.updateVehicle);
router.delete("/:vehicleId", auth("admin"), vehiclesController.deleteVehicle);

export const vehicleRoutes = router;