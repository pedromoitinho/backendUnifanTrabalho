import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Conecta Causa API",
      version: "1.0.0",
      description:
        "API RESTful para plataforma de matchmaking entre voluntários e organizações sociais. Sistema inteligente que conecta pessoas dispostas a ajudar com causas que precisam de apoio.",
      contact: {
        name: "Conecta Causa",
        email: "contato@conectacausa.org",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de Desenvolvimento",
      },
      {
        url: "https://api.conectacausa.org",
        description: "Servidor de Produção",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Token JWT obtido através do endpoint de login",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "ID único do usuário",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email do usuário",
            },
            name: {
              type: "string",
              description: "Nome completo",
            },
            role: {
              type: "string",
              enum: ["volunteer", "organization"],
              description: "Tipo de usuário",
            },
            skills: {
              type: "array",
              items: { type: "string" },
              description: "Habilidades do voluntário",
            },
            location: {
              type: "string",
              description: "Localização (cidade, estado)",
            },
            latitude: {
              type: "number",
              description: "Latitude da localização",
            },
            longitude: {
              type: "number",
              description: "Longitude da localização",
            },
            availability: {
              type: "array",
              items: { type: "string" },
              description: "Dias da semana disponíveis",
            },
            bio: {
              type: "string",
              description: "Biografia/Descrição",
            },
            phone: {
              type: "string",
              description: "Telefone de contato",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Organization: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            name: {
              type: "string",
              description: "Nome da organização",
            },
            description: {
              type: "string",
              description: "Descrição da organização e suas atividades",
            },
            website: {
              type: "string",
              format: "uri",
            },
            email: {
              type: "string",
              format: "email",
            },
            phone: {
              type: "string",
            },
            address: {
              type: "string",
            },
            location: {
              type: "string",
            },
            latitude: {
              type: "number",
            },
            longitude: {
              type: "number",
            },
            causes: {
              type: "array",
              items: { type: "string" },
              description: "Causas apoiadas pela organização",
            },
            logoUrl: {
              type: "string",
              format: "uri",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Opportunity: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            title: {
              type: "string",
              description: "Título da oportunidade",
            },
            description: {
              type: "string",
              description: "Descrição detalhada da oportunidade",
            },
            requiredSkills: {
              type: "array",
              items: { type: "string" },
              description: "Habilidades necessárias",
            },
            location: {
              type: "string",
            },
            latitude: {
              type: "number",
            },
            longitude: {
              type: "number",
            },
            schedule: {
              type: "array",
              items: { type: "string" },
              description: "Dias da semana necessários",
            },
            startDate: {
              type: "string",
              format: "date",
            },
            endDate: {
              type: "string",
              format: "date",
            },
            vacancies: {
              type: "integer",
              description: "Número de vagas disponíveis",
            },
            status: {
              type: "string",
              enum: ["active", "closed", "completed"],
              description: "Status da oportunidade",
            },
            causes: {
              type: "array",
              items: { type: "string" },
            },
            organization: {
              $ref: "#/components/schemas/Organization",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Application: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            status: {
              type: "string",
              enum: ["pending", "approved", "rejected", "withdrawn"],
              description: "Status da candidatura",
            },
            message: {
              type: "string",
              description: "Mensagem do voluntário",
            },
            volunteer: {
              $ref: "#/components/schemas/User",
            },
            opportunity: {
              $ref: "#/components/schemas/Opportunity",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        MatchResult: {
          type: "object",
          properties: {
            opportunity: {
              $ref: "#/components/schemas/Opportunity",
            },
            score: {
              type: "number",
              description: "Score de compatibilidade (0-1)",
              minimum: 0,
              maximum: 1,
            },
            breakdown: {
              type: "object",
              properties: {
                skillMatch: {
                  type: "number",
                  description: "Compatibilidade de habilidades (0-1)",
                },
                scheduleMatch: {
                  type: "number",
                  description: "Compatibilidade de horários (0-1)",
                },
                distance: {
                  type: "number",
                  description: "Distância em km",
                },
              },
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Mensagem de erro",
            },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
              description: "Token JWT para autenticação",
            },
            user: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Autenticação",
        description: "Endpoints de registro, login e autenticação",
      },
      {
        name: "Organizações",
        description: "Gerenciamento de organizações/ONGs",
      },
      {
        name: "Oportunidades",
        description: "Oportunidades de voluntariado e matchmaking",
      },
      {
        name: "Candidaturas",
        description: "Gerenciamento de candidaturas a oportunidades",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
