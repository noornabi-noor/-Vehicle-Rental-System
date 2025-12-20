import express from "express";
import { bookingsController } from "./bookings.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", auth("admin", "customer"), bookingsController.createBooking);
router.get("/", auth("admin", "customer"), bookingsController.getBookings);
router.put("/:bookingId", auth("admin", "customer"), bookingsController.updateBooking);
router.delete("/:bookingId", auth("admin"), bookingsController.deleteBooking);

export const bookingsRoutes = router;