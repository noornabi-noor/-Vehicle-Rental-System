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
};

const getUsers = async(req: Request, res: Response) => {
    try {
        const result = await userServices.getUsers();

        res.status(200).json({
            success : true,
            message : "Users retrived successfully",
            data : result.rows
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const getSingleUser = async (req:Request, res:Response) => {
    try {
        const result = await userServices.getSingleUser(req.params.userId as string);

        if(result.rows.length === 0){
            res.status(404).json({
                success : false,
                message : "User not found"
            })
        }
        else{
            res.status(200).json({
                success : true,
                message : "User retrived successfully",
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


const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, role } = req.body;
    const userId = req.params.userId;

    if (req.user?.role !== "admin" && req.user?.id !== Number(userId)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedRole = req.user?.role === "admin" ? role : undefined;

    const result = await userServices.updateUser(name, email, role, phone, req.params.userId as string);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0]
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const deleteUser = async(req: Request, res: Response)=>{
    try {
        const result = await userServices.deleteUser(req.params.userId as string);

        if(result.rowCount === 0){
            res.status(404).json({
            success: false,
            message: "User not found"
        })
        }
        else{
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
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

export const userController = {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser
}