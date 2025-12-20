import dotenv from "dotenv";
import express, { Request, Response } from "express";
import path from "path";
import initDB from "./config/db";
import { userRoutes } from "./modules/users/user.routes";
import { vehicleRoutes } from "./modules/vehicles/vehicles.routes";
import { bookingRoutes } from "./modules/bookings/bookings.routes";
import { authRoutes } from "./modules/auth/auth.routes";


dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = express();

//Parser
app.use(express.json());
// app.use(express.urlencoded()); //it is used for formdata as a parser

initDB();

app.use("/v1/users", userRoutes);
app.use("/v1/vehicles", vehicleRoutes);
app.use("/v1/bookings", bookingRoutes)
app.use("/v1/auth", authRoutes);

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;