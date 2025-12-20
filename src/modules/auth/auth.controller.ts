import { Request, Response } from "express";
import { authServices } from "./auth.services";

const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const user = await authServices.signUp(
      name,
      email,
      password,
      phone,
      role
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await authServices.signIn(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const authController = {
  signUp,
  signIn,
};
