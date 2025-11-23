# 🚀 Deploy no Render - Conecta Causa API

## ✅ Configuração Completa para Deploy

### 1. **Arquivos de Configuração Criados**

#### **render.yaml**
```yaml
services:
  - type: web
    name: conecta-causa-api
    env: node
    region: oregon
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

#### **.node-version**
```
NODE_VERSION=22.16.0
```

#### **package.json** (engines)
```json
"engines": {
  "node": ">=18.0.0",
  "npm": ">=9.0.0"
}
```

---

## 🔧 Passos para Deploy

### **Opção 1: Via Dashboard do Render (Recomendado)**

1. **Acesse o Render Dashboard**
   - https://dashboard.render.com

2. **Criar Novo Web Service**
   - Clique em "New +" → "Web Service"
   - Conecte seu repositório GitHub: `pedromoitinho/backendUnifanTrabalho`

3. **Configurações do Serviço**
   ```
   Name: conecta-causa-api
   Region: Oregon (US West)
   Branch: main
   Root Directory: (deixe vazio)
   Environment: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **Variáveis de Ambiente**
   Adicione no painel "Environment":
   ```
   NODE_ENV=production
   PORT=10000
   DB_HOST=dpg-d4hi4qvdiees73bivt1g-a.oregon-postgres.render.com
   DB_PORT=5432
   DB_USERNAME=postgreunifan_user
   DB_PASSWORD=bmD7jcEKnuryZFwXzjcplycbS0wEYNC9
   DB_NAME=postgreunifan
   JWT_SECRET=conecta-causa-super-secret-key-change-in-production-2025
   JWT_EXPIRES_IN=7d
   CORS_ORIGIN=*
   ```

5. **Criar o Serviço**
   - Clique em "Create Web Service"
   - Aguarde o build e deploy automático

---

### **Opção 2: Via render.yaml (Blueprint)**

Se você já tem o `render.yaml` no repositório:

1. **No Dashboard do Render**
   - Clique em "New +" → "Blueprint"
   - Conecte o repositório
   - O Render detectará automaticamente o `render.yaml`

2. **Adicionar Variáveis de Ambiente Manualmente**
   - Vá em "Environment" no serviço criado
   - Adicione as variáveis listadas acima

---

## 🔍 Troubleshooting

### Erro: "Cannot find module '/opt/render/project/src/dist/index.js'"

**Causa**: O caminho estava incorreto ou o build não foi executado.

**Solução Aplicada**:
1. ✅ Configurado `buildCommand: npm install && npm run build`
2. ✅ Configurado `startCommand: npm start` (que executa `node dist/index.js`)
3. ✅ Adicionado `engines` no package.json
4. ✅ TypeScript e @types já estão em `dependencies` (necessário para build)

### Erro: "Module not found" durante build

**Solução**: Certifique-se que todas as dependências estão em `dependencies`, não em `devDependencies`.

✅ **Status Atual**: Todas as dependências já estão corretas!

### Build Muito Lento

**Dica**: Use cache do npm/pnpm. O Render faz cache automaticamente.

### Erro de SSL no Banco de Dados

✅ **Já Resolvido**: O código já tem SSL configurado:
```typescript
ssl: process.env.DB_HOST?.includes("render.com")
  ? { rejectUnauthorized: false }
  : false
```

---

## 📊 Estrutura de Deploy

```
GitHub Push → Render Webhook → Build Process → Deploy

Build Process:
1. npm install (instala dependências)
2. npm run build (compila TypeScript → dist/)
3. npm start (executa node dist/index.js)
```

---

## 🔐 Variáveis de Ambiente Necessárias

| Variável | Valor | Descrição |
|----------|-------|-----------|
| `NODE_ENV` | `production` | Ambiente de execução |
| `PORT` | `10000` | Porta do Render (padrão) |
| `DB_HOST` | `dpg-...render.com` | Host do PostgreSQL |
| `DB_PORT` | `5432` | Porta do PostgreSQL |
| `DB_USERNAME` | `postgreunifan_user` | Usuário do banco |
| `DB_PASSWORD` | `bmD7jcEKnuryZFwXzjcplycbS0wEYNC9` | Senha do banco |
| `DB_NAME` | `postgreunifan` | Nome do banco |
| `JWT_SECRET` | `sua-chave-secreta` | Chave para JWT |
| `JWT_EXPIRES_IN` | `7d` | Expiração do token |
| `CORS_ORIGIN` | `*` | Origens permitidas |

---

## 🎯 Checklist de Deploy

- [x] `package.json` com engines configurado
- [x] `render.yaml` criado
- [x] `.node-version` definida
- [x] TypeScript em `dependencies`
- [x] Build script funcional (`tsc`)
- [x] Start script correto (`node dist/index.js`)
- [x] SSL configurado para Render
- [x] Código commitado e pushed para GitHub
- [ ] Variáveis de ambiente adicionadas no Render
- [ ] Serviço criado no Render
- [ ] Deploy bem-sucedido
- [ ] Health check funcionando (`/health`)
- [ ] Swagger acessível (`/api-docs`)

---

## 🧪 Testar Após Deploy

1. **Health Check**
   ```bash
   curl https://seu-app.onrender.com/health
   ```

2. **Swagger UI**
   ```
   https://seu-app.onrender.com/api-docs
   ```

3. **Registrar Usuário**
   ```bash
   curl -X POST https://seu-app.onrender.com/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Teste",
       "email": "teste@example.com",
       "password": "senha123",
       "role": "volunteer"
     }'
   ```

---

## 🔄 Deploy Automático

Após configurado, todo push na branch `main` dispara deploy automático:

```bash
git add .
git commit -m "Update API"
git push origin main
```

O Render detecta, faz build e deploy automaticamente! 🎉

---

## 📝 Logs

Para ver logs em tempo real:
1. Acesse o Dashboard do Render
2. Clique no seu serviço
3. Vá na aba "Logs"
4. Ou use Render CLI: `render logs -f`

---

## 💡 Dicas de Produção

1. **Banco de Dados**: Está usando PostgreSQL do Render (correto!)
2. **SSL**: Já configurado no código ✅
3. **CORS**: Configurado como `*` (considere restringir em produção)
4. **Logs**: O Render salva logs automaticamente
5. **Monitoring**: Use Render Dashboard para métricas
6. **Domínio Custom**: Configure em Settings → Custom Domain

---

## 🆘 Suporte

Se algo der errado:
1. Verifique logs no Dashboard
2. Confirme variáveis de ambiente
3. Teste localmente: `npm run build && npm start`
4. Verifique se o banco está acessível

---

**Status Atual**: ✅ Tudo configurado! Só falta criar o serviço no Dashboard do Render e adicionar as variáveis de ambiente.

---

## 🎉 URL Final

Após deploy, sua API estará disponível em:
```
https://conecta-causa-api.onrender.com
```

Swagger:
```
https://conecta-causa-api.onrender.com/api-docs
```
