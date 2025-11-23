# 🤝 Conecta Causa API

API REST para conectar voluntários com ONGs através de um sistema inteligente de matchmaking.

## 🚀 Tecnologias

- **Node.js** + **TypeScript**
- **Express 5**
- **TypeORM** com **PostgreSQL**
- **JWT** para autenticação
- **bcryptjs** para hash de senhas
- **class-validator** para validação

## 📋 Pré-requisitos

- Node.js >= 18
- PostgreSQL >= 14
- pnpm (ou npm/yarn)

## 🔧 Instalação

1. Clone o repositório e instale as dependências:
```bash
cd backend
pnpm install
```

2. Configure o banco de dados PostgreSQL:
```sql
CREATE DATABASE conecta_causa;
```

3. Configure as variáveis de ambiente (já está criado o `.env`):
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=conecta_causa
JWT_SECRET=conecta-causa-super-secret-key-change-in-production-2025
```

4. Inicie o servidor em modo desenvolvimento:
```bash
pnpm dev
```

O servidor estará rodando em `http://localhost:3000`

## 📚 Endpoints da API

### 🔐 Autenticação (`/api/auth`)

#### POST `/api/auth/register`
Registra um novo usuário (voluntário ou organização).

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123",
  "role": "volunteer",
  "skills": ["programação", "design"],
  "availability": ["segunda", "quarta", "sexta"],
  "location": "São Paulo, SP",
  "latitude": -23.5505,
  "longitude": -46.6333
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@example.com",
    "role": "volunteer"
  }
}
```

#### POST `/api/auth/login`
Faz login e retorna token JWT.

**Body:**
```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

#### GET `/api/users/me` 🔒
Retorna dados do usuário autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

---

### 🏢 Organizações (`/api/organizations`)

#### POST `/api/organizations` 🔒
Cria uma nova organização.

**Body:**
```json
{
  "name": "ONG Esperança",
  "description": "Ajudamos crianças carentes",
  "address": "Rua das Flores, 123",
  "phone": "(11) 98765-4321",
  "website": "https://ongesperanca.org"
}
```

#### GET `/api/organizations`
Lista todas as organizações.

#### GET `/api/organizations/:id`
Busca organização por ID.

#### PUT `/api/organizations/:id` 🔒
Atualiza organização.

#### DELETE `/api/organizations/:id` 🔒
Remove organização.

---

### 🎯 Oportunidades (`/api/opportunities`)

#### POST `/api/opportunities` 🔒
Cria uma nova oportunidade de voluntariado.

**Body:**
```json
{
  "title": "Professor de Programação",
  "description": "Ensinar jovens a programar",
  "requiredSkills": ["programação", "python"],
  "schedule": ["segunda", "quarta"],
  "location": "São Paulo, SP",
  "latitude": -23.5505,
  "longitude": -46.6333,
  "vacancies": 5,
  "startDate": "2025-02-01",
  "endDate": "2025-06-30",
  "organizationId": "uuid-da-org"
}
```

#### GET `/api/opportunities`
Lista todas as oportunidades disponíveis.

#### GET `/api/opportunities/match` 🔒 ⭐
**MATCHMAKING INTELIGENTE** - Encontra as melhores oportunidades para o voluntário autenticado.

**Query Params (opcionais):**
- `limit`: número de resultados (padrão: 10)

**Algoritmo de Matchmaking:**
- **50%** - Compatibilidade de habilidades
- **30%** - Compatibilidade de horários
- **20%** - Proximidade geográfica (Haversine)

**Response:**
```json
{
  "matches": [
    {
      "opportunity": { ...detalhes da oportunidade... },
      "score": 0.85,
      "breakdown": {
        "skillMatch": 0.9,
        "scheduleMatch": 0.8,
        "distance": 5.2
      }
    }
  ]
}
```

#### GET `/api/opportunities/:id`
Busca oportunidade por ID.

#### PUT `/api/opportunities/:id` 🔒
Atualiza oportunidade.

#### DELETE `/api/opportunities/:id` 🔒
Remove oportunidade.

---

### 📝 Candidaturas (`/api/applications` ou `/api/opportunities/:id/apply`)

#### POST `/api/opportunities/:id/apply` 🔒
Candidata-se a uma oportunidade.

**Body:**
```json
{
  "message": "Tenho 5 anos de experiência em Python e adoraria ajudar!"
}
```

#### GET `/api/users/my-applications` 🔒
Lista todas as candidaturas do usuário autenticado.

#### PUT `/api/applications/:id` 🔒
Atualiza status da candidatura (para organizações).

**Body:**
```json
{
  "status": "approved"
}
```

#### DELETE `/api/applications/:id` 🔒
Cancela candidatura.

---

## 🧠 Algoritmo de Matchmaking

O sistema utiliza três critérios principais:

### 1. **Compatibilidade de Habilidades (50%)**
```typescript
skillMatch = (habilidades_em_comum / total_habilidades_requeridas)
```

### 2. **Compatibilidade de Horários (30%)**
```typescript
scheduleMatch = (dias_em_comum / total_dias_requeridos)
```

### 3. **Proximidade Geográfica (20%)**
```typescript
// Fórmula de Haversine para calcular distância em km
distance = haversine(lat1, lon1, lat2, lon2)
distanceScore = 1 / (1 + distance/10)
```

### Score Final:
```typescript
finalScore = (skillMatch * 0.5) + (scheduleMatch * 0.3) + (distanceScore * 0.2)
```

---

## 🗄️ Estrutura do Banco de Dados

### Entidades

- **User** - Usuários (voluntários e organizações)
- **Organization** - Dados das ONGs
- **Opportunity** - Oportunidades de voluntariado
- **Application** - Candidaturas dos voluntários

### Relacionamentos

```
User 1:N Organization (owner)
User N:M Organization (members)
Organization 1:N Opportunity
User 1:N Application
Opportunity 1:N Application
```

---

## 🧪 Testando a API

### 1. Registrar um voluntário:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Santos",
    "email": "maria@example.com",
    "password": "senha123",
    "role": "volunteer",
    "skills": ["design", "marketing"],
    "availability": ["segunda", "quarta", "sexta"],
    "location": "São Paulo, SP",
    "latitude": -23.5505,
    "longitude": -46.6333
  }'
```

### 2. Fazer login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@example.com",
    "password": "senha123"
  }'
```

### 3. Buscar matches (use o token recebido):
```bash
curl http://localhost:3000/api/opportunities/match?limit=5 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## 📂 Estrutura do Projeto

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Configuração TypeORM
│   ├── entities/
│   │   ├── User.ts              # Entidade de usuários
│   │   ├── Organization.ts      # Entidade de organizações
│   │   ├── Opportunity.ts       # Entidade de oportunidades
│   │   └── Application.ts       # Entidade de candidaturas
│   ├── middleware/
│   │   └── auth.middleware.ts   # Middleware JWT
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── organization.service.ts
│   │   ├── opportunity.service.ts
│   │   └── application.service.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── organization.controller.ts
│   │   ├── opportunity.controller.ts
│   │   └── application.controller.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── organization.routes.ts
│   │   ├── opportunity.routes.ts
│   │   └── application.routes.ts
│   ├── utils/
│   │   └── matchmaking.utils.ts # Algoritmos de matchmaking
│   ├── types/
│   │   └── express.d.ts         # Type extensions
│   └── index.ts                 # Entry point
├── .env                         # Variáveis de ambiente
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔒 Autenticação

A API usa **JWT (JSON Web Tokens)** para autenticação. 

Para acessar rotas protegidas (marcadas com 🔒), inclua o token no header:

```
Authorization: Bearer <seu_token_jwt>
```

---

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento (com hot reload)
pnpm dev

# Build para produção
pnpm build

# Executar build de produção
pnpm start
```

---

## 🌟 Funcionalidades Principais

✅ Sistema completo de autenticação JWT  
✅ CRUD de usuários, organizações e oportunidades  
✅ **Algoritmo inteligente de matchmaking**  
✅ Sistema de candidaturas  
✅ Cálculo de distância geográfica (Haversine)  
✅ Matching por habilidades e disponibilidade  
✅ Validação de dados com class-validator  
✅ TypeORM com migrations automáticas  
✅ Arquitetura em camadas (MVC)  

---

## 📝 Notas

- O TypeORM está configurado com `synchronize: true` em desenvolvimento, o que cria/atualiza tabelas automaticamente
- Em **produção**, desative `synchronize` e use migrations
- Troque o `JWT_SECRET` em produção
- Configure CORS adequadamente para produção
- Use variáveis de ambiente seguras

---

## 🤝 Conecta Causa

**Missão**: Aproximar voluntários de causas sociais através de tecnologia e matchmaking inteligente.

---

**Desenvolvido com ❤️ para fazer a diferença**
