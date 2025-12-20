import { pool } from "../../config/db";

// Helper: calculate total days (at least 1)
const calculateDays = (start: Date, end: Date) => {
  const diff = end.getTime() - start.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24)) || 1;
};

// Create booking
const createBooking = async (
  customer_id: number,
  vehicle_id: number,
  rent_start_date: string,
  rent_end_date: string
) => {
  const vehicleRes = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [vehicle_id]);
  if (vehicleRes.rows.length === 0) throw new Error("Vehicle not found");

  const vehicle = vehicleRes.rows[0];
  if (vehicle.availability_status !== "available") throw new Error("Vehicle not available");

 
  const days = calculateDays(new Date(rent_start_date), new Date(rent_end_date));
  const total_price = Number(vehicle.daily_rent_price) * days;


  const result = await pool.query(
    `INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES($1,$2,$3,$4,$5,'active') RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  await pool.query(`UPDATE vehicles SET availability_status='booked' WHERE id=$1`, [vehicle_id]);

  return result;
};

// Get bookings
const getBookings = async (user: any) => {
  if (user.role === "admin") {
    return await pool.query(`SELECT * FROM bookings`);
  } else {
    return await pool.query(`SELECT * FROM bookings WHERE customer_id=$1`, [user.id]);
  }
};

// Update booking
const updateBooking = async (bookingId: string, user: any, status: string) => {
  const bookingRes = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [bookingId]);
  if (bookingRes.rows.length === 0) throw new Error("Booking not found");

  const booking = bookingRes.rows[0];

  if (user.role === "customer") {
    if (booking.customer_id !== user.id) throw new Error("Cannot update others' bookings");
    if (status !== "cancelled") throw new Error("Customers can only cancel bookings");
    if (new Date() >= new Date(booking.rent_start_date)) throw new Error("Cannot cancel after start date");
  } else if (user.role === "admin") {
    if (status !== "returned") throw new Error("Admin can only mark returned");
    // Update vehicle status
    await pool.query(`UPDATE vehicles SET availability_status='available' WHERE id=$1`, [booking.vehicle_id]);
  }

  const result = await pool.query(
    `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
    [status, bookingId]
  );

  return result;
};

// Delete booking
const deleteBooking = async (bookingId: string) => {
  const bookingRes = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [bookingId]);
  if (bookingRes.rows.length === 0) throw new Error("Booking not found");

  if (bookingRes.rows[0].status === "active") throw new Error("Cannot delete active booking");

  const result = await pool.query(`DELETE FROM bookings WHERE id=$1`, [bookingId]);
  return result;
};

export const bookingsServices = {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking
};
