import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar novo usuário
 *     description: Cria uma nova conta de voluntário ou organização
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Maria Silva"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "maria@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "senha123"
 *               role:
 *                 type: string
 *                 enum: [volunteer, organization]
 *                 example: "volunteer"
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["programação", "design"]
 *               availability:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["segunda", "quarta"]
 *               location:
 *                 type: string
 *                 example: "São Paulo, SP"
 *               latitude:
 *                 type: number
 *                 example: -23.5505
 *               longitude:
 *                 type: number
 *                 example: -46.6333
 *               bio:
 *                 type: string
 *                 example: "Desenvolvedor apaixonado por causas sociais"
 *               phone:
 *                 type: string
 *                 example: "(11) 98765-4321"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Dados inválidos ou email já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Fazer login
 *     description: Autentica um usuário e retorna token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "maria@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Obter perfil do usuário autenticado
 *     description: Retorna os dados do usuário logado
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/me", authMiddleware, authController.getProfile);

export default router;
