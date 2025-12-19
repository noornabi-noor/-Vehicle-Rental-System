import { Request, Response } from "express"
import { userServices } from "./user.service";

const createUser = async(req:Request, res:Response) => {
    try {
        const result = await userServices.createUser(req.body);

        res.status(201).json({
            success : false,
            message : "User inserted successfully",
            data : result.rows[0]
        })
    } catch (error:any) {
        res.status(501).json({
            success : false,
            message : error.message
        })
    }
}

export const userController = {
    createUser,
}