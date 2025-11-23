# 📝 Exemplos de Requisições - Conecta Causa API

## 🔐 Autenticação

### 1. Registrar Voluntário

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Silva",
    "email": "maria@example.com",
    "password": "senha123",
    "role": "volunteer",
    "skills": ["programação", "design", "marketing digital"],
    "availability": ["segunda", "quarta", "sexta"],
    "location": "São Paulo, SP",
    "latitude": -23.5505,
    "longitude": -46.6333,
    "bio": "Desenvolvedora web com 5 anos de experiência, apaixonada por causas sociais",
    "phone": "(11) 98765-4321"
  }'
```

### 2. Registrar Organização

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin ONG",
    "email": "admin@ongesperanca.org",
    "password": "senha123",
    "role": "organization"
  }'
```

### 3. Fazer Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@example.com",
    "password": "senha123"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Maria Silva",
    "email": "maria@example.com",
    "role": "volunteer"
  }
}
```

> ⚠️ **Salve o token!** Você precisará dele para as próximas requisições.

### 4. Ver Perfil (autenticado)

```bash
curl http://localhost:3000/api/users/me \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## 🏢 Organizações

### 5. Criar Organização

```bash
curl -X POST http://localhost:3000/api/organizations \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ONG Esperança",
    "description": "Trabalhamos para proporcionar educação de qualidade para crianças em situação de vulnerabilidade social",
    "address": "Rua das Flores, 123 - Centro",
    "phone": "(11) 3456-7890",
    "email": "contato@ongesperanca.org",
    "website": "https://ongesperanca.org",
    "location": "São Paulo, SP",
    "latitude": -23.5489,
    "longitude": -46.6388,
    "causes": ["educação", "crianças", "inclusão social"]
  }'
```

### 6. Listar Todas as Organizações

```bash
curl http://localhost:3000/api/organizations
```

### 7. Buscar Organização por ID

```bash
curl http://localhost:3000/api/organizations/550e8400-e29b-41d4-a716-446655440000
```

### 8. Atualizar Organização

```bash
curl -X PUT http://localhost:3000/api/organizations/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Nova descrição atualizada",
    "phone": "(11) 3456-9999"
  }'
```

### 9. Deletar Organização

```bash
curl -X DELETE http://localhost:3000/api/organizations/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer SEU_TOKEN"
```

---

## 🎯 Oportunidades de Voluntariado

### 10. Criar Oportunidade

```bash
curl -X POST http://localhost:3000/api/opportunities \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Professor de Programação para Jovens",
    "description": "Buscamos voluntários para ensinar Python e JavaScript para jovens de 14 a 18 anos. As aulas acontecem duas vezes por semana no período da tarde.",
    "requiredSkills": ["programação", "python", "javascript", "didática"],
    "schedule": ["segunda", "quarta"],
    "location": "São Paulo, SP - Zona Sul",
    "latitude": -23.5505,
    "longitude": -46.6333,
    "vacancies": 3,
    "startDate": "2025-02-01",
    "endDate": "2025-06-30",
    "organizationId": "ID_DA_ORGANIZACAO",
    "causes": ["educação", "tecnologia", "jovens"]
  }'
```

### 11. Listar Todas as Oportunidades

```bash
curl http://localhost:3000/api/opportunities
```

### 12. Buscar Oportunidade por ID

```bash
curl http://localhost:3000/api/opportunities/ID_DA_OPORTUNIDADE
```

### 13. ⭐ MATCHMAKING - Encontrar Melhores Oportunidades

```bash
curl http://localhost:3000/api/opportunities/match?limit=10 \
  -H "Authorization: Bearer SEU_TOKEN"
```

**Response:**
```json
{
  "matches": [
    {
      "opportunity": {
        "id": "...",
        "title": "Professor de Programação para Jovens",
        "description": "...",
        "requiredSkills": ["programação", "python"],
        "location": "São Paulo, SP",
        "organization": {
          "name": "ONG Esperança"
        }
      },
      "score": 0.92,
      "breakdown": {
        "skillMatch": 1.0,
        "scheduleMatch": 1.0,
        "distance": 2.3
      }
    }
  ]
}
```

> 💡 **Como funciona o score?**
> - `skillMatch`: Porcentagem de habilidades que você possui (0 a 1)
> - `scheduleMatch`: Compatibilidade de horários (0 a 1)
> - `distance`: Distância em km da sua localização
> - `score`: Score final ponderado (50% skills + 30% schedule + 20% distance)

### 14. Atualizar Oportunidade

```bash
curl -X PUT http://localhost:3000/api/opportunities/ID_DA_OPORTUNIDADE \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "vacancies": 5,
    "status": "active"
  }'
```

### 15. Deletar Oportunidade

```bash
curl -X DELETE http://localhost:3000/api/opportunities/ID_DA_OPORTUNIDADE \
  -H "Authorization: Bearer SEU_TOKEN"
```

---

## 📝 Candidaturas

### 16. Candidatar-se a uma Oportunidade

```bash
curl -X POST http://localhost:3000/api/opportunities/ID_DA_OPORTUNIDADE/apply \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Olá! Tenho 5 anos de experiência com Python e JavaScript, e já dei aulas particulares para adolescentes. Adoraria contribuir com esse projeto educacional!"
  }'
```

### 17. Ver Minhas Candidaturas

```bash
curl http://localhost:3000/api/users/my-applications \
  -H "Authorization: Bearer SEU_TOKEN"
```

**Response:**
```json
[
  {
    "id": "...",
    "status": "pending",
    "message": "Olá! Tenho 5 anos de experiência...",
    "opportunity": {
      "title": "Professor de Programação",
      "organization": {
        "name": "ONG Esperança"
      }
    },
    "createdAt": "2025-01-20T10:30:00Z"
  }
]
```

### 18. Atualizar Status da Candidatura (Organizações)

```bash
curl -X PUT http://localhost:3000/api/applications/ID_DA_CANDIDATURA \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "approved"
  }'
```

Valores possíveis para `status`:
- `pending` - Aguardando análise
- `approved` - Aprovado
- `rejected` - Rejeitado
- `withdrawn` - Cancelado pelo voluntário

### 19. Cancelar Candidatura

```bash
curl -X DELETE http://localhost:3000/api/applications/ID_DA_CANDIDATURA \
  -H "Authorization: Bearer SEU_TOKEN"
```

---

## 🧪 Testando o Fluxo Completo

### Cenário: Voluntário encontra e se candidata a uma oportunidade

```bash
# 1. Registrar como voluntário
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Santos",
    "email": "joao@example.com",
    "password": "senha123",
    "role": "volunteer",
    "skills": ["design", "photoshop", "marketing"],
    "availability": ["segunda", "terça", "quinta"],
    "location": "São Paulo, SP",
    "latitude": -23.5505,
    "longitude": -46.6333
  }' | jq -r '.token')

echo "Token: $TOKEN"

# 2. Buscar melhores oportunidades (matchmaking)
curl http://localhost:3000/api/opportunities/match?limit=5 \
  -H "Authorization: Bearer $TOKEN"

# 3. Candidatar-se à melhor oportunidade
OPPORTUNITY_ID="ID_DA_OPORTUNIDADE_COM_MELHOR_SCORE"

curl -X POST http://localhost:3000/api/opportunities/$OPPORTUNITY_ID/apply \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tenho experiência com design gráfico e adoraria ajudar!"
  }'

# 4. Ver minhas candidaturas
curl http://localhost:3000/api/users/my-applications \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🛠️ Ferramentas Recomendadas

### Postman
1. Importe a collection (crie um arquivo `conecta-causa.postman_collection.json`)
2. Configure uma variável de ambiente `token` com seu JWT
3. Use `{{token}}` nos headers Authorization

### Thunder Client (VS Code)
1. Instale a extensão Thunder Client
2. Crie uma nova collection "Conecta Causa"
3. Adicione as requisições acima
4. Configure environment variable para o token

### Insomnia
1. Crie um novo workspace
2. Importe as requisições
3. Use chain requests para pegar o token automaticamente

---

## 📊 Dados de Exemplo

### Habilidades Comuns
```json
[
  "programação",
  "design",
  "marketing",
  "fotografia",
  "inglês",
  "espanhol",
  "ensino",
  "psicologia",
  "direito",
  "contabilidade",
  "medicina",
  "enfermagem",
  "cozinha",
  "jardinagem",
  "música",
  "esportes"
]
```

### Dias da Semana
```json
[
  "segunda",
  "terça",
  "quarta",
  "quinta",
  "sexta",
  "sábado",
  "domingo"
]
```

### Causas Sociais
```json
[
  "educação",
  "saúde",
  "meio ambiente",
  "crianças",
  "idosos",
  "animais",
  "inclusão social",
  "cultura",
  "esportes",
  "tecnologia",
  "direitos humanos"
]
```

---

## 🎯 Health Check

```bash
curl http://localhost:3000/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-20T15:30:00.000Z",
  "service": "Conecta Causa API"
}
```

---

**Dica:** Salve esses exemplos e adapte conforme necessário! 🚀
