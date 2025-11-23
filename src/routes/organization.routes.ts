import { Router } from "express";
import { OrganizationController } from "../controllers/organization.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const organizationController = new OrganizationController();

/**
 * @swagger
 * /api/organizations:
 *   post:
 *     summary: Criar nova organização
 *     tags: [Organizações]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: "ONG Esperança"
 *               description:
 *                 type: string
 *                 example: "Trabalhamos com educação para crianças"
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               website:
 *                 type: string
 *               location:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               causes:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Organização criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *   get:
 *     summary: Listar todas as organizações
 *     tags: [Organizações]
 *     responses:
 *       200:
 *         description: Lista de organizações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Organization'
 */
router.post("/", authMiddleware, organizationController.create);
router.get("/", organizationController.findAll);

/**
 * @swagger
 * /api/organizations/{id}:
 *   get:
 *     summary: Buscar organização por ID
 *     tags: [Organizações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados da organização
 *       404:
 *         description: Organização não encontrada
 *   put:
 *     summary: Atualizar organização
 *     tags: [Organizações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Organização atualizada
 *   delete:
 *     summary: Deletar organização
 *     tags: [Organizações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Organização deletada
 */
router.get("/:id", organizationController.findById);
router.put("/:id", authMiddleware, organizationController.update);
router.delete("/:id", authMiddleware, organizationController.delete);

export default router;
