# Como publicar no Render

Este guia explica como fazer o deploy da sua aplicação no Render.

## Pré-requisitos

1. Conta no Render (gratuita): https://render.com
2. Seu código no GitHub, GitLab ou Bitbucket

## Passos para Deploy

### 1. Preparar o Repositório

Certifique-se de que todos os arquivos estão commitados no seu repositório Git:
- `render.yaml` - Configuração do Render
- `.node-version` - Versão do Node.js
- Todo o código da aplicação

### 2. Conectar ao Render

1. Acesse https://dashboard.render.com
2. Clique em "New +" e selecione "Blueprint"
3. Conecte sua conta do GitHub/GitLab/Bitbucket
4. Selecione o repositório do seu projeto
5. O Render detectará automaticamente o arquivo `render.yaml`

### 3. Configurar Variáveis de Ambiente

O `render.yaml` já está configurado para:
- ✅ `DATABASE_URL` - Será conectado automaticamente ao banco PostgreSQL
- ✅ `SESSION_SECRET` - Será gerado automaticamente
- ✅ `PORT` - Configurado para 10000 (padrão do Render)
- ✅ `NODE_ENV` - Definido como production

### 4. Deploy

1. Clique em "Apply" para criar os serviços
2. O Render irá:
   - Criar um banco de dados PostgreSQL gratuito
   - Criar um web service
   - Executar `npm install && npm run build`
   - Iniciar a aplicação com `npm start`

### 5. Executar Migrações do Banco

Após o primeiro deploy, você pode precisar executar as migrações:

1. No painel do Render, vá para o seu serviço web
2. Clique em "Shell" no menu lateral
3. Execute: `npm run db:push`

## URLs

Após o deploy, sua aplicação estará disponível em:
- `https://meu-site.onrender.com` (ou o nome que você escolher)

## Atualizações

Sempre que você fizer push para o branch principal do seu repositório, o Render automaticamente:
1. Fará o build da nova versão
2. Executará os testes (se configurados)
3. Fará o deploy da nova versão

## Plano Gratuito

O plano gratuito inclui:
- 750 horas/mês de web service
- 1 GB RAM
- Banco PostgreSQL com 1 GB de armazenamento
- A aplicação hiberna após 15 minutos de inatividade
- Primeiro acesso pode levar 30-60 segundos (cold start)

### ✨ Sistema Keep-Alive Ativado

Seu site já está configurado com um sistema automático de keep-alive que:
- ✅ Faz ping automático a cada 10 minutos
- ✅ Evita hibernação no plano gratuito
- ✅ Mantém o site sempre ativo
- ✅ Funciona apenas em produção (não em desenvolvimento)

O sistema usa o endpoint `/api/health` para verificar o status do servidor.

**Nota**: Mesmo com o keep-alive, o Render pode hibernar o serviço se atingir os limites do plano gratuito (750 horas/mês).

## Upgrade para Plano Pago

Para garantir uptime 100% e melhor performance:
1. Vá em "Settings" no seu web service
2. Mude o plano de "Free" para "Starter" ($7/mês)
3. Com plano pago, o keep-alive não é necessário (mas não causa problemas)

## Troubleshooting

### Aplicação não inicia
- Verifique os logs em "Logs" no painel do Render
- Certifique-se que todas as variáveis de ambiente estão configuradas

### Erro de banco de dados
- Verifique se executou `npm run db:push`
- Confirme que DATABASE_URL está conectado corretamente

### Build falha
- Verifique se todas as dependências estão no `package.json`
- Confirme que o Node.js versão 20.16.11 está sendo usado

## Suporte

Para mais informações, consulte a documentação oficial do Render:
https://docs.render.com
