import { Request, Response } from "express";
import { bookingsServices } from "./bookings.services";


const createBookings = async(req : Request, res : Response) => {
    try {
        const {customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status} = req.body;
            const result = await bookingsServices.createBookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status);
    
            res.status(201).json({
                success : true,
                message : "Bookings added successfully",
                data : result.rows[0]
            })
        } catch (error:any) {
            res.status(500).json({
                success : false,
                message : error.message
            })
        }
};

const getBookings = async(req: Request, res: Response) => {
    try {
        const result = await bookingsServices.getBookings();

        res.status(200).json({
            success : true,
            message : "Bookings retrived successfully",
            data : result.rows
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const getSingleBookings = async (req:Request, res:Response) => {
    try {
        const result = await bookingsServices.getSingleBookings(req.params.bookingId as string);

        if(result.rows.length === 0){
            res.status(404).json({
                success : false,
                message : "Booking not found"
            })
        }
        else{
            res.status(200).json({
                success : true,
                message : "Booking retrived successfully",
                data : result.rows[0]
            })
        }
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const updateBookings = async(req: Request, res: Response)=>{
    try {
      const {customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status} = req.body;

        const result = await bookingsServices.updateBookings
        (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status, req.params.bookingId as string);

        if(result.rows.length === 0){
            res.status(404).json({
            success: false,
            message: "Booking not found"
        })
        }
        else{
            res.status(200).json({
                success: true,
                message: "Booking updated successfully",
                data: result.rows[0]
            })
        }
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};


const deleteBookings = async(req: Request, res: Response)=>{
    try {
        const result = await bookingsServices.deleteBookings(req.params.bookingId as string);

        if(result.rowCount === 0){
            res.status(404).json({
            success: false,
            message: "Booking not found"
        })
        }
        else{
            res.status(200).json({
                success: true,
                message: "Booking deleted successfully",
                data: null
            })
        }
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

export const bookingsController = {
    createBookings,
    getBookings,
    getSingleBookings,
    updateBookings,
    deleteBookings
}