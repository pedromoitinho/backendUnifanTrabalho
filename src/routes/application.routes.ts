import { Router } from "express";
import { ApplicationController } from "../controllers/application.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const applicationController = new ApplicationController();

/**
 * @swagger
 * /api/opportunities/{id}/apply:
 *   post:
 *     summary: Candidatar-se a uma oportunidade
 *     description: Voluntário se candidata a uma oportunidade específica
 *     tags: [Candidaturas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da oportunidade
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Tenho experiência na área e gostaria muito de ajudar!"
 *     responses:
 *       201:
 *         description: Candidatura criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       400:
 *         description: Já existe candidatura para essa oportunidade
 *       401:
 *         description: Não autenticado
 */
router.post("/:id/apply", authMiddleware, applicationController.create);

/**
 * @swagger
 * /api/users/my-applications:
 *   get:
 *     summary: Listar minhas candidaturas
 *     description: Retorna todas as candidaturas do usuário autenticado
 *     tags: [Candidaturas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de candidaturas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 *       401:
 *         description: Não autenticado
 */
router.get("/my-applications", authMiddleware, applicationController.findMyApplications);

/**
 * @swagger
 * /api/applications/{id}:
 *   put:
 *     summary: Atualizar status da candidatura
 *     description: Organizações podem aprovar/rejeitar candidaturas
 *     tags: [Candidaturas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected, withdrawn]
 *                 example: "approved"
 *     responses:
 *       200:
 *         description: Status atualizado
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Candidatura não encontrada
 *   delete:
 *     summary: Cancelar candidatura
 *     description: Voluntário cancela sua candidatura
 *     tags: [Candidaturas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Candidatura cancelada
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Candidatura não encontrada
 */
router.put("/:id", authMiddleware, applicationController.updateStatus);
router.delete("/:id", authMiddleware, applicationController.delete);

export default router;
