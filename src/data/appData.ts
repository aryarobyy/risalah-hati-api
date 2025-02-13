import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT
export const JWT_SECRET_KEY = process.env.JWT_SECRET || "default-secret-key-bapak-tua-butut-antik"
export const JWT_EXPIRED_TOkEN = process.env.JWT_ACCESS_TOKEN_EXPIRED || "7d"