"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require('http');
class Server {
    static start(port) {
        this.server = http.createServer();
        this.server.listen(port);
        this.server.on('error', this.onError);
        this.server.on('listening', this.onListening);
    }
    static onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }
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
    static onListening() {
        const addr = Server.server.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        console.log('Listening on ' + bind);
    }
}
Server.server = http.createServer();
class Application {
    static main() {
        Server.start(3000);
    }
}
exports.Application = Application;
Application.main();
//# sourceMappingURL=index.js.map