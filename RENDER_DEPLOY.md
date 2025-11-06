# Deploy no Render - Guia Rápido

## ✅ Configuração Manual Completa

Suas configurações no Render devem estar assim:

### Build Command
```
npm install && npm run build
```

### Start Command
```
npm start
```

### Environment Variables (já configuradas ✓)
- `DATABASE_URL` = (do PostgreSQL Database interno)
- `SESSION_SECRET` = qualquer string aleatória
- `NODE_ENV` = production
- `PORT` = 10000

### Health Check Path
```
/api/health
```

## 🚀 Deploy

Agora faça commit e push:

```bash
git add .
git commit -m "Remove render.yaml config files"
git push origin main
```

O Render detectará automaticamente e fará o deploy!

## 📋 Após Deploy Bem-Sucedido

Execute as migrações do banco:
1. Render → Shell
2. `npm run db:push`

## ✨ Features Configuradas

- ✅ Keep-alive automático (evita hibernação)
- ✅ Health check em /api/health
- ✅ Database PostgreSQL
- ✅ Sessões com secret

Pronto para usar!
