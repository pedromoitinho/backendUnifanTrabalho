import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { UserRole } from "../entities/User";

export class AuthController {
  private authService = new AuthService();

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, name, role, skills, location, latitude, longitude, availability, bio, phone } = req.body;

      if (!email || !password || !name || !role) {
        res.status(400).json({ error: "Campos obrigatórios faltando" });
        return;
      }

      if (!Object.values(UserRole).includes(role)) {
        res.status(400).json({ error: "Tipo de usuário inválido" });
        return;
      }

      const result = await this.authService.register({
        email,
        password,
        name,
        role,
        skills,
        location,
        latitude,
        longitude,
        availability,
        bio,
        phone,
      });

      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email e senha são obrigatórios" });
        return;
      }

      const result = await this.authService.login({ email, password });
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  };

  getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Usuário não autenticado" });
        return;
      }

      const user = await this.authService.getProfile(req.user.id);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };
}
