import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import { JWT_EXPIRED_TOkEN, JWT_SECRET_KEY } from "../data/appData";

export const generateToken = (payload: object, expiresIn?: number | StringValue) => {
    return jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: expiresIn ? expiresIn : JWT_EXPIRED_TOkEN as StringValue
    });
};

export const verifyToken = (token: string) => {
    try {
      return jwt.verify(token, JWT_SECRET_KEY);
    } catch (error) {
      return null;
    }
  };