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

- ✅ Keep-alive MELHORADO (evita hibernação):
  - Ping a cada 5 minutos (antes era 10)
  - Sistema de retry automático (3 tentativas com backoff exponencial)
  - Timeout de 15 segundos por tentativa
  - Logs detalhados para monitoramento
  - Alerta de falhas consecutivas
- ✅ Health check em /api/health
- ✅ Database PostgreSQL
- ✅ Sessões com secret

## 📊 Monitoramento do Keep-alive

Após o deploy, você verá nos logs do Render:
- `✓ Keep-alive OK` - Sistema funcionando corretamente
- `⚠ Keep-alive falhou` - Retentando automaticamente
- `🔴 ALERTA` - Muitas falhas consecutivas (verificar configuração)

## ⚠️ Importante sobre o Plano Gratuito do Render

O plano gratuito do Render tem limitações:
- Hiberna após 15 minutos de inatividade
- Limite de 750 horas/mês
- Mesmo com keep-alive, pode haver breves momentos de hibernação

Para garantir 100% de uptime, considere upgrade para plano pago ($7/mês).

Pronto para usar!
