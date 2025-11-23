import { AppDataSource } from "../config/database";
import { User, UserRole } from "../entities/User";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export interface RegisterDTO {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  skills?: string[];
  location?: string;
  latitude?: number;
  longitude?: number;
  availability?: string[];
  bio?: string;
  phone?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(data: RegisterDTO): Promise<{ user: User; token: string }> {
    const existingUser = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("Email já cadastrado");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    const token = this.generateToken(user);

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword as User, token };
  }

  async login(data: LoginDTO): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
      relations: ["organization"],
    });

    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error("Credenciais inválidas");
    }

    const token = this.generateToken(user);

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword as User, token };
  }

  async getProfile(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["organization", "applications"],
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }

  private generateToken(user: User): string {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    // @ts-ignore
    return jwt.sign(
      payload,
      process.env.JWT_SECRET || "default-secret",
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );
  }
}
