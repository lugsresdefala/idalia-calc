// Sistema básico de monitoramento de erros para produção
interface ErrorLog {
  message: string;
  stack?: string;
  url?: string;
  timestamp: string;
  userAgent: string;
  type: 'error' | 'unhandledRejection';
}

class ErrorMonitor {
  private errorQueue: ErrorLog[] = [];
  private maxQueueSize = 10;
  private isProduction = import.meta.env.PROD;

  constructor() {
    if (this.isProduction) {
      this.setupErrorHandlers();
    }
  }

  private setupErrorHandlers() {
    // Capturar erros JavaScript
    window.addEventListener('error', (event) => {
      this.logError({
        message: event.message,
        stack: event.error?.stack,
        url: event.filename,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        type: 'error'
      });
    });

    // Capturar promises rejeitadas
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        message: event.reason?.message || String(event.reason),
        stack: event.reason?.stack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        type: 'unhandledRejection'
      });
    });
  }

  private logError(error: ErrorLog) {
    // Adicionar à fila
    this.errorQueue.push(error);
    
    // Limitar tamanho da fila
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift();
    }

    // Em produção, enviar para servidor (implementar endpoint se necessário)
    if (this.isProduction) {
      this.sendToServer(error);
    }
  }

  private async sendToServer(error: ErrorLog) {
    try {
      // Enviar para endpoint de logging quando disponível
      await fetch('/api/log-error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(error),
      }).catch(() => {
        // Falha silenciosa se o endpoint não existir
      });
    } catch {
      // Ignorar erros de logging
    }
  }

  public getErrors(): ErrorLog[] {
    return [...this.errorQueue];
  }

  public clearErrors(): void {
    this.errorQueue = [];
  }
}

// Exportar instância única
export const errorMonitor = new ErrorMonitor();

// Função helper para logging manual
export function logError(message: string, error?: Error) {
  if (import.meta.env.DEV) {
    console.error(message, error);
  } else {
    errorMonitor['logError']({
      message: `${message}: ${error?.message || 'Unknown error'}`,
      stack: error?.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      type: 'error'
    });
  }
}