# 📖 Documentação Swagger - Conecta Causa API

## ✅ Swagger Implementado com Sucesso!

A documentação interativa da API está disponível em:

🔗 **http://localhost:3000/api-docs**

---

## 📦 O que foi adicionado:

### 1. **Pacotes Instalados**
```bash
- swagger-ui-express
- swagger-jsdoc
- @types/swagger-ui-express
- @types/swagger-jsdoc
```

### 2. **Arquivos Criados/Modificados**

#### **`src/config/swagger.ts`**
Configuração completa do Swagger com:
- ✅ Schemas de todos os modelos (User, Organization, Opportunity, Application)
- ✅ Schema de MatchResult (algoritmo de matchmaking)
- ✅ Schema de resposta de autenticação
- ✅ Configuração de segurança JWT (bearerAuth)
- ✅ Tags organizadas por funcionalidade
- ✅ Servidores (development e production)

#### **`src/index.ts`**
- ✅ Integração do Swagger UI em `/api-docs`
- ✅ Customização visual (removendo topbar)
- ✅ Log de inicialização mostrando URL da documentação

#### **Rotas Documentadas**

**`src/routes/auth.routes.ts`**
- ✅ POST /api/auth/register - Registro com exemplos completos
- ✅ POST /api/auth/login - Login
- ✅ GET /api/users/me - Perfil autenticado

**`src/routes/opportunity.routes.ts`**
- ✅ GET /api/opportunities/match - ⭐ **MATCHMAKING** (destaque especial)
- ✅ POST /api/opportunities - Criar oportunidade
- ✅ GET /api/opportunities - Listar todas
- ✅ GET /api/opportunities/:id - Buscar por ID
- ✅ PUT /api/opportunities/:id - Atualizar
- ✅ DELETE /api/opportunities/:id - Deletar

**`src/routes/organization.routes.ts`**
- ✅ POST /api/organizations - Criar organização
- ✅ GET /api/organizations - Listar todas
- ✅ GET /api/organizations/:id - Buscar por ID
- ✅ PUT /api/organizations/:id - Atualizar
- ✅ DELETE /api/organizations/:id - Deletar

**`src/routes/application.routes.ts`**
- ✅ POST /api/opportunities/:id/apply - Candidatar-se
- ✅ GET /api/users/my-applications - Minhas candidaturas
- ✅ PUT /api/applications/:id - Atualizar status
- ✅ DELETE /api/applications/:id - Cancelar candidatura

---

## 🎯 Recursos do Swagger

### 1. **Interface Interativa**
- Testar todos os endpoints diretamente no navegador
- Ver respostas em tempo real
- Validação automática de schemas

### 2. **Autenticação JWT**
- Botão "Authorize" no topo da página
- Após fazer login, copie o token
- Clique em "Authorize" e cole: `Bearer SEU_TOKEN`
- Todos os endpoints protegidos funcionarão automaticamente

### 3. **Schemas Detalhados**
Todos os modelos estão documentados com:
- Tipos de dados
- Formatos (uuid, email, date, etc.)
- Descrições de cada campo
- Exemplos práticos

### 4. **Exemplos de Request/Response**
Cada endpoint inclui:
- Exemplo de corpo da requisição
- Possíveis códigos de status
- Estrutura da resposta
- Descrição dos erros

---

## 🚀 Como Usar

### 1. **Iniciar o Servidor**
```bash
pnpm dev
```

### 2. **Acessar a Documentação**
Abra no navegador:
```
http://localhost:3000/api-docs
```

### 3. **Testar Endpoints**

#### Sem Autenticação:
1. Clique em qualquer endpoint público (ex: `POST /api/auth/register`)
2. Clique em "Try it out"
3. Preencha os dados no JSON
4. Clique em "Execute"
5. Veja a resposta abaixo

#### Com Autenticação:
1. Primeiro, registre-se ou faça login em `/api/auth/login`
2. Copie o `token` da resposta
3. Clique no botão **"Authorize"** 🔒 no topo da página
4. Cole o token (automaticamente adiciona "Bearer ")
5. Clique em "Authorize" e depois "Close"
6. Agora você pode testar endpoints protegidos! 🎉

---

## 📝 Exemplo Prático

### Fluxo Completo de Teste:

1. **Registrar Voluntário**
   - Endpoint: `POST /api/auth/register`
   - Copiar o token da resposta

2. **Autorizar no Swagger**
   - Clicar em "Authorize"
   - Colar o token
   - Clicar em "Authorize"

3. **Buscar Matches** ⭐
   - Endpoint: `GET /api/opportunities/match`
   - Ver as oportunidades compatíveis com seus dados

4. **Ver Perfil**
   - Endpoint: `GET /api/users/me`
   - Confirmar seus dados

5. **Candidatar-se**
   - Endpoint: `POST /api/opportunities/{id}/apply`
   - Substituir `{id}` pelo ID de uma oportunidade
   - Adicionar mensagem

---

## 🎨 Personalização

### CSS Customizado
O Swagger está configurado com:
```typescript
customCss: '.swagger-ui .topbar { display: none }'
```
Isso remove a barra superior do Swagger para interface mais limpa.

### Título Personalizado
```typescript
customSiteTitle: "Conecta Causa API Docs"
```
Aparece na aba do navegador.

---

## 📊 Schemas Disponíveis

### User
- ID, email, nome, role
- Skills, disponibilidade, localização
- Bio, telefone
- Timestamps

### Organization
- ID, nome, descrição
- Contatos (email, phone, website)
- Endereço, localização (lat/lng)
- Causas, logo
- Timestamps

### Opportunity
- ID, título, descrição
- Skills necessárias, cronograma
- Localização, vagas
- Status (active/closed/completed)
- Datas de início/fim
- Organização relacionada
- Timestamps

### Application
- ID, status (pending/approved/rejected/withdrawn)
- Mensagem do voluntário
- Voluntário relacionado
- Oportunidade relacionada
- Timestamps

### MatchResult ⭐
- Oportunidade completa
- Score total (0-1)
- Breakdown:
  - skillMatch (compatibilidade de habilidades)
  - scheduleMatch (compatibilidade de horários)
  - distance (distância em km)

---

## 🔍 Tags Organizadas

Os endpoints estão agrupados por funcionalidade:

1. **Autenticação** - Registro, login, perfil
2. **Organizações** - CRUD de organizações/ONGs
3. **Oportunidades** - CRUD + matchmaking
4. **Candidaturas** - Aplicações a oportunidades

---

## ✨ Destaques

### 🌟 Endpoint de Matchmaking
O endpoint mais importante está destacado na documentação:
```
GET /api/opportunities/match ⭐ MATCHMAKING
```

Descrição especial:
> "Encontra as melhores oportunidades para o voluntário autenticado usando algoritmo de matchmaking (50% skills + 30% schedule + 20% distance)"

---

## 🔒 Segurança

O Swagger está configurado com:
```yaml
securitySchemes:
  bearerAuth:
    type: http
    scheme: bearer
    bearerFormat: JWT
```

Endpoints protegidos exibem um ícone de cadeado 🔒 na interface.

---

## 📱 Responsivo

A interface do Swagger é totalmente responsiva e funciona em:
- Desktop
- Tablet
- Mobile

---

## 🎉 Pronto para Usar!

A documentação Swagger está **100% funcional** e pronta para uso!

Acesse: **http://localhost:3000/api-docs**

---

## 💡 Dicas

1. **Export da Spec**: A spec OpenAPI está disponível programaticamente em `swaggerSpec`
2. **JSON Spec**: Acesse `http://localhost:3000/api-docs.json` para ver a spec bruta (se configurar)
3. **Testes Automatizados**: Use a spec para gerar testes com ferramentas como Postman
4. **Code Generation**: Use a spec para gerar clientes em outras linguagens

---

**Desenvolvido com ❤️ para facilitar o desenvolvimento e integração com a API Conecta Causa**
