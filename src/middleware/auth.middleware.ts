import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";

interface JwtPayload {
  userId: string;
  email: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ error: "Token não fornecido" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default-secret"
    ) as JwtPayload;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: decoded.userId },
      relations: ["organization"],
    });

    if (!user) {
      res.status(401).json({ error: "Usuário não encontrado" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido ou expirado" });
  }
};
