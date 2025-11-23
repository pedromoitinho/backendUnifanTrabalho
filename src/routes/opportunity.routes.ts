import { Router } from "express";
import { OpportunityController } from "../controllers/opportunity.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const opportunityController = new OpportunityController();

/**
 * @swagger
 * /api/opportunities/match:
 *   get:
 *     summary: Matchmaking inteligente (⭐ PRINCIPAL)
 *     description: Encontra as melhores oportunidades para o voluntário autenticado usando algoritmo de matchmaking (50% skills + 30% schedule + 20% distance)
 *     tags: [Oportunidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número máximo de resultados
 *     responses:
 *       200:
 *         description: Lista de oportunidades compatíveis ordenadas por score
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 matches:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MatchResult'
 *       401:
 *         description: Não autenticado
 */
router.get("/match", authMiddleware, opportunityController.findMatches);

/**
 * @swagger
 * /api/opportunities:
 *   post:
 *     summary: Criar nova oportunidade
 *     description: Cria uma nova oportunidade de voluntariado (apenas organizações)
 *     tags: [Oportunidades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - requiredSkills
 *               - schedule
 *               - location
 *               - latitude
 *               - longitude
 *               - organizationId
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Professor de Programação"
 *               description:
 *                 type: string
 *                 example: "Ensinar Python para jovens"
 *               requiredSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["programação", "python"]
 *               schedule:
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
 *               vacancies:
 *                 type: integer
 *                 example: 5
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-30"
 *               organizationId:
 *                 type: string
 *                 format: uuid
 *               causes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["educação", "tecnologia"]
 *     responses:
 *       201:
 *         description: Oportunidade criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Opportunity'
 *       401:
 *         description: Não autenticado
 *   get:
 *     summary: Listar todas as oportunidades
 *     description: Retorna todas as oportunidades disponíveis
 *     tags: [Oportunidades]
 *     responses:
 *       200:
 *         description: Lista de oportunidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Opportunity'
 */
router.post("/", authMiddleware, opportunityController.create);
router.get("/", opportunityController.findAll);

/**
 * @swagger
 * /api/opportunities/{id}:
 *   get:
 *     summary: Buscar oportunidade por ID
 *     tags: [Oportunidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Dados da oportunidade
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Opportunity'
 *       404:
 *         description: Oportunidade não encontrada
 *   put:
 *     summary: Atualizar oportunidade
 *     tags: [Oportunidades]
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
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               vacancies:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [active, closed, completed]
 *     responses:
 *       200:
 *         description: Oportunidade atualizada
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Oportunidade não encontrada
 *   delete:
 *     summary: Deletar oportunidade
 *     tags: [Oportunidades]
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
 *         description: Oportunidade deletada
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Oportunidade não encontrada
 */
router.get("/:id", opportunityController.findById);
router.put("/:id", authMiddleware, opportunityController.update);
router.delete("/:id", authMiddleware, opportunityController.delete);

export default router;
