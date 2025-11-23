import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { AppDataSource } from "./config/database";
import { swaggerSpec } from "./config/swagger";
import authRoutes from "./routes/auth.routes";
import organizationRoutes from "./routes/organization.routes";
import opportunityRoutes from "./routes/opportunity.routes";
import applicationRoutes from "./routes/application.routes";

dotenv.config();

const app: Express = express();

// Middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Conecta Causa API Docs",
}));

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "Conecta Causa API",
  });
});

// Rotas da API
app.use("/api/auth", authRoutes);
app.use("/api/users", authRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/opportunities", applicationRoutes);
app.use("/api/users", applicationRoutes);
app.use("/api/applications", applicationRoutes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint não encontrado" });
});

// Inicializar banco de dados e servidor
const port = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Banco de dados conectado com sucesso!");
    console.log("📊 Entidades:", AppDataSource.entityMetadatas.map(e => e.name).join(", "));

    app.listen(port, () => {
      console.log(`\n🚀 Servidor rodando em http://localhost:${port}`);
      console.log(`📚 Health check: http://localhost:${port}/health`);
      console.log(`📖 Documentação Swagger: http://localhost:${port}/api-docs`);
      console.log("\n📋 Endpoints disponíveis:");
      console.log("  POST   /api/auth/register");
      console.log("  POST   /api/auth/login");
      console.log("  GET    /api/users/me");
      console.log("  POST   /api/organizations");
      console.log("  GET    /api/organizations");
      console.log("  GET    /api/organizations/:id");
      console.log("  PUT    /api/organizations/:id");
      console.log("  DELETE /api/organizations/:id");
      console.log("  POST   /api/opportunities");
      console.log("  GET    /api/opportunities");
      console.log("  GET    /api/opportunities/match ⭐ MATCHMAKING");
      console.log("  GET    /api/opportunities/:id");
      console.log("  PUT    /api/opportunities/:id");
      console.log("  DELETE /api/opportunities/:id");
      console.log("  POST   /api/opportunities/:id/apply");
      console.log("  GET    /api/users/my-applications");
      console.log("  PUT    /api/applications/:id");
      console.log("  DELETE /api/applications/:id");
    });
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  });
