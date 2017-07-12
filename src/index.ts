const http = require('http');
import { Request, Response } from 'express';

class Server {

  public static server = http.createServer();

  public static start (port: number) {
    this.server = http.createServer();
    this.server.listen(port);
    this.server.on('error', this.onError);
    this.server.on('listening', this.onListening);
  }

  private static onError (error: any) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(this.server.port + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(this.server.port + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  private static onListening () {
    const addr = Server.server.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    console.log('Listening on ' + bind);
  }

}


export class Application {
  public static main (): void {
    Server.start(3000);
  }
}

Application.main();