import dotenv from "dotenv"

dotenv.config()

export const PORT = process.env.PORT || 1000
export const DB_CONNECTION = process.env.MONGO_CONNECTION_STRING!
export const JWT_SECRET = process.env.JWT_SECRET!