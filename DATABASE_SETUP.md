# 🗄️ Setup do Banco de Dados PostgreSQL

## Opção 1: Instalação Local do PostgreSQL

### Windows

1. **Baixar o PostgreSQL**:
   - Acesse: https://www.postgresql.org/download/windows/
   - Baixe o instalador para Windows
   - Versão recomendada: PostgreSQL 16

2. **Instalar**:
   - Execute o instalador
   - Durante a instalação, defina uma senha para o usuário `postgres` (anote essa senha!)
   - Porta padrão: 5432
   - Deixe as outras opções padrão

3. **Criar o banco de dados**:
   ```bash
   # Abra o psql (SQL Shell) no menu Iniciar
   # Ou use o PowerShell/CMD:
   psql -U postgres
   
   # Digite a senha que você definiu
   # Depois, crie o banco:
   CREATE DATABASE conecta_causa;
   
   # Verifique:
   \l
   
   # Saia:
   \q
   ```

4. **Atualizar o arquivo `.env`**:
   ```env
   DB_PASSWORD=SUA_SENHA_AQUI
   ```

### Linux (Ubuntu/Debian)

```bash
# Instalar PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Iniciar o serviço
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Criar o banco
sudo -u postgres psql
CREATE DATABASE conecta_causa;
\q

# Criar usuário (opcional)
sudo -u postgres psql
CREATE USER seu_usuario WITH PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE conecta_causa TO seu_usuario;
\q
```

### macOS

```bash
# Usando Homebrew
brew install postgresql@16

# Iniciar o serviço
brew services start postgresql@16

# Criar o banco
createdb conecta_causa

# Ou via psql
psql postgres
CREATE DATABASE conecta_causa;
\q
```

---

## Opção 2: Docker (Recomendado para desenvolvimento)

### Requisitos
- Docker Desktop instalado

### Comandos

```bash
# 1. Criar e iniciar o container PostgreSQL
docker run --name conecta-causa-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=conecta_causa \
  -p 5432:5432 \
  -d postgres:16-alpine

# 2. Verificar se está rodando
docker ps

# 3. Ver logs
docker logs conecta-causa-db

# 4. Parar o container
docker stop conecta-causa-db

# 5. Iniciar novamente
docker start conecta-causa-db

# 6. Remover o container (se necessário)
docker rm -f conecta-causa-db
```

### Docker Compose (ainda melhor)

Crie um arquivo `docker-compose.yml` na raiz do projeto:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: conecta-causa-db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: conecta_causa
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

Comandos:
```bash
# Iniciar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down

# Parar e remover dados
docker-compose down -v
```

---

## Opção 3: PostgreSQL Online (Para testes rápidos)

### ElephantSQL (Grátis)
1. Acesse: https://www.elephantsql.com/
2. Crie uma conta
3. Crie uma nova instância (plano Tiny Turtle - grátis)
4. Copie a URL de conexão

Atualize o `.env`:
```env
# Exemplo de URL do ElephantSQL
DATABASE_URL=postgres://user:pass@server.db.elephantsql.com/dbname

# Ou configure individualmente:
DB_HOST=server.db.elephantsql.com
DB_PORT=5432
DB_USERNAME=user
DB_PASSWORD=password
DB_NAME=dbname
```

### Supabase (Grátis)
1. Acesse: https://supabase.com/
2. Crie um projeto
3. Vá em Settings > Database
4. Copie as credenciais de conexão

### Render (Grátis)
1. Acesse: https://render.com/
2. Crie um PostgreSQL database
3. Copie as credenciais

---

## Verificar Conexão

Após configurar o banco, teste a conexão:

```bash
# Na raiz do projeto
pnpm dev
```

Você deve ver:
```
✅ Banco de dados conectado com sucesso!
📊 Entidades: User, Organization, Opportunity, Application
🚀 Servidor rodando em http://localhost:3000
```

---

## Troubleshooting

### Erro: "ECONNREFUSED"
- PostgreSQL não está rodando
- Verifique com: `docker ps` (se usar Docker) ou `systemctl status postgresql` (Linux)

### Erro: "password authentication failed"
- Senha incorreta no `.env`
- Verifique `DB_PASSWORD`

### Erro: "database does not exist"
- Execute: `CREATE DATABASE conecta_causa;`

### Porta 5432 já em uso
- Outro PostgreSQL está rodando
- Mude a porta no `.env` e no comando Docker: `-p 5433:5432`

---

## Próximos Passos

Após o banco estar funcionando:

1. **Inicie o servidor**: `pnpm dev`
2. **Teste o health check**: Acesse http://localhost:3000/health
3. **Registre um usuário**: Use o endpoint `POST /api/auth/register`
4. **Explore a API**: Veja o README.md para todos os endpoints

---

## Backup e Restore

### Backup
```bash
# Com Docker
docker exec conecta-causa-db pg_dump -U postgres conecta_causa > backup.sql

# Local
pg_dump -U postgres conecta_causa > backup.sql
```

### Restore
```bash
# Com Docker
docker exec -i conecta-causa-db psql -U postgres conecta_causa < backup.sql

# Local
psql -U postgres conecta_causa < backup.sql
```

---

🎉 **Pronto!** Agora você tem o banco de dados configurado e pode começar a usar a API Conecta Causa!
