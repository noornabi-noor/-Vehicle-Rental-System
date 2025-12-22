import dotenv from "dotenv";
import express, { Request, Response } from "express";
import path from "path";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/users/user.routes";
import { vehicleRoutes } from "./modules/vehicles/vehicles.routes";
import { bookingsRoutes } from "./modules/bookings/bookings.routes";


dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = express();

//Parser
app.use(express.json());
// app.use(express.urlencoded()); //it is used for formdata as a parser

initDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/vehicles", vehicleRoutes);
app.use("/api/v1/bookings", bookingsRoutes)


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