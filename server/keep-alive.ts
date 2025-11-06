import { log } from "./vite";

const TEN_MINUTES = 10 * 60 * 1000; // 10 minutos em milissegundos

export function startKeepAlive() {
  // Só ativa em produção (no Render)
  if (process.env.NODE_ENV !== "production") {
    log("Keep-alive desativado em desenvolvimento");
    return;
  }

  const port = parseInt(process.env.PORT || '10000', 10);
  const url = process.env.RENDER_EXTERNAL_URL || `http://localhost:${port}`;
  const healthCheckUrl = `${url}/api/health`;

  log(`Keep-alive ativado - ping a cada 10 minutos em ${healthCheckUrl}`);

  // Faz o primeiro ping após 1 minuto
  setTimeout(() => {
    pingServer(healthCheckUrl);
    
    // Depois faz ping a cada 10 minutos
    setInterval(() => {
      pingServer(healthCheckUrl);
    }, TEN_MINUTES);
  }, 60000); // 1 minuto
}

async function pingServer(url: string) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'User-Agent': 'KeepAlive/1.0' }
    });
    
    if (response.ok) {
      log(`✓ Keep-alive ping bem-sucedido - ${new Date().toISOString()}`);
    } else {
      log(`⚠ Keep-alive ping retornou status ${response.status}`);
    }
  } catch (error) {
    log(`✗ Erro no keep-alive ping: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
