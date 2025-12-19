import dotenv from "dotenv";
import express, { Request, Response } from "express";
import path from "path";
import initDB from "./config/db";
import { userRoutes } from "./modules/users/user.routes";


dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = express();

//Parser
app.use(express.json());
// app.use(express.urlencoded()); //it is used for formdata as a parser

initDB();

app.use("/users", userRoutes);

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