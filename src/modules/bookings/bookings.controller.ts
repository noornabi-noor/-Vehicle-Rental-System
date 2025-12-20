import { Request, Response } from "express";
import { bookingsServices } from "./bookings.services";

// Create booking
const createBooking = async (req: Request, res: Response) => {
  try {
    const { vehicle_id, rent_start_date, rent_end_date } = req.body;

    const result = await bookingsServices.createBooking(
      req.user!.id,
      Number(vehicle_id),
      rent_start_date,
      rent_end_date
    );

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result.rows[0]
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get bookings
const getBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingsServices.getBookings(req.user);
    res.status(200).json({ success: true, data: result.rows });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update booking
const updateBooking = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    const result = await bookingsServices.updateBooking(req.params.bookingId as string, req.user, status);

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: result.rows[0]
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete booking
const deleteBooking = async (req: Request, res: Response) => {
  try {
    await bookingsServices.deleteBooking(req.params.bookingId as string);
    res.status(200).json({ success: true, message: "Booking deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const bookingsController = {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking
};
