import express from "express";
import { bookingsController } from "./bookings.controller";



const router = express.Router();

router.post("/", bookingsController.createBookings);
router.get("/", bookingsController.getBookings);
router.get("/:bookingId", bookingsController.getSingleBookings);
router.put("/:bookingId", bookingsController.updateBookings);
router.delete("/:bookingId", bookingsController.deleteBookings);

export const bookingRoutes = router;