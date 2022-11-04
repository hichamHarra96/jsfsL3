import http from 'http';
import RequestController from './controllers/requestController.js';
import { Server as ServerIO } from 'socket.io';
import IOController from './controllers/IoController.js';


const server = http.createServer(
	(request, response) => new RequestController(request, response).handleRequest()
);

const io = new ServerIO(server);
const IoController = new IOController(io);

const connectionListener = socket => {
	IoController.registerSocket(socket);
}
io.on('connection', connectionListener);

server.listen(8080);
