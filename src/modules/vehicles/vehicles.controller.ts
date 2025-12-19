import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.service";


const createVehicles = async(req : Request, res : Response) => {
    try {
        const {vehicle_name, type, registration_number, daily_rent_price, availability_status} = req.body;
            const result = await vehiclesServices.createVehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status);
    
            res.status(201).json({
                success : true,
                message : "Vehicle added successfully",
                data : result.rows[0]
            })
        } catch (error:any) {
            res.status(500).json({
                success : false,
                message : error.message
            })
        }
};

const getVehicles = async(req: Request, res: Response) => {
    try {
        const result = await vehiclesServices.getVehicles();

        res.status(200).json({
            success : true,
            message : "Vehicles retrived successfully",
            data : result.rows
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const getSingleVehicle = async (req:Request, res:Response) => {
    try {
        const result = await vehiclesServices.getSingleVehicles(req.params.vehicleId as string);

        if(result.rows.length === 0){
            res.status(404).json({
                success : false,
                message : "Vehicle not found"
            })
        }
        else{
            res.status(200).json({
                success : true,
                message : "Vehicle retrived successfully",
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

const updateVehicle = async(req: Request, res: Response)=>{
    try {
      const {vehicle_name, type, registration_number, daily_rent_price, availability_status} = req.body;

        const result = await vehiclesServices.updateVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status, req.params.vehicleId as string);

        if(result.rows.length === 0){
            res.status(404).json({
            success: false,
            message: "Vehicle not found"
        })
        }
        else{
            res.status(200).json({
                success: true,
                message: "Vehicle updated successfully",
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


const deleteVehicle = async(req: Request, res: Response)=>{
    try {
        const result = await vehiclesServices.deleteVehicle(req.params.vehicleId as string);

        if(result.rowCount === 0){
            res.status(404).json({
            success: false,
            message: "Vehicle not found"
        })
        }
        else{
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully",
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

export const vehiclesController = {
    createVehicles,
    getVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
}