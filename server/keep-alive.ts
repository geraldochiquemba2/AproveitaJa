import { log } from "./vite";

const FIVE_MINUTES = 5 * 60 * 1000; // 5 minutos em milissegundos
const PING_TIMEOUT = 15000; // 15 segundos timeout
const MAX_RETRIES = 3; // Número máximo de tentativas

let consecutiveFailures = 0;

export function startKeepAlive() {
  // Só ativa em produção (no Render)
  if (process.env.NODE_ENV !== "production") {
    log("Keep-alive desativado em desenvolvimento");
    return;
  }

  const port = parseInt(process.env.PORT || '10000', 10);
  const url = process.env.RENDER_EXTERNAL_URL || `http://localhost:${port}`;
  const healthCheckUrl = `${url}/api/health`;

  log(`🚀 Keep-alive ATIVADO - ping a cada 5 minutos em ${healthCheckUrl}`);

  // Faz o primeiro ping após 30 segundos
  setTimeout(() => {
    pingServerWithRetry(healthCheckUrl);
    
    // Depois faz ping a cada 5 minutos
    setInterval(() => {
      pingServerWithRetry(healthCheckUrl);
    }, FIVE_MINUTES);
  }, 30000); // 30 segundos
}

async function pingServerWithRetry(url: string, attempt: number = 1) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), PING_TIMEOUT);

    const response = await fetch(url, {
      method: 'GET',
      headers: { 
        'User-Agent': 'KeepAlive/2.0',
        'Cache-Control': 'no-cache'
      },
      signal: controller.signal
    });

    clearTimeout(timeout);
    
    if (response.ok) {
      consecutiveFailures = 0;
      const data = await response.json();
      log(`✓ Keep-alive OK [tentativa ${attempt}] - uptime: ${Math.floor(data.uptime)}s - ${new Date().toISOString()}`);
    } else {
      throw new Error(`Status HTTP ${response.status}`);
    }
  } catch (error) {
    consecutiveFailures++;
    const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido';
    
    if (attempt < MAX_RETRIES) {
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000); // Backoff exponencial (max 10s)
      log(`⚠ Keep-alive falhou (tentativa ${attempt}/${MAX_RETRIES}): ${errorMsg} - Retentando em ${delay/1000}s...`);
      
      setTimeout(() => {
        pingServerWithRetry(url, attempt + 1);
      }, delay);
    } else {
      log(`✗ Keep-alive FALHOU após ${MAX_RETRIES} tentativas: ${errorMsg} - Falhas consecutivas: ${consecutiveFailures}`);
      
      // Alerta se houver muitas falhas consecutivas
      if (consecutiveFailures >= 3) {
        log(`🔴 ALERTA: ${consecutiveFailures} falhas consecutivas de keep-alive! Verifique a configuração do Render.`);
      }
    }
  }
}
