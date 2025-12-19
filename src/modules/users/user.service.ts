import bcrypt from "bcryptjs";
import { pool } from "../../config/db";


const createUser = async(payload: Record<string , unknown>) => {
    const {name, email, password, role, phone} = payload; 

    const hashPassword = await bcrypt.hash(password as string, 10);

    const result = await pool.query(`INSERT INTO users
        (name, email, password, role, phone) VALUES($1, $2, $3, $4, $5) RETURNING *`,
        [name, email, hashPassword, role, phone]);
    return result;
}

export const userServices = {
    createUser,
}