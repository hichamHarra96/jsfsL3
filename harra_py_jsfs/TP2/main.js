import http from 'http';
import { Server as ServerIO } from 'socket.io';
import IOController from './controllers/ioController.js';
import RequestController from './controllers/requestController.js';

var randNum;

const server = http.createServer(
	(request, response) => new RequestController(request, response).handleRequest()
);

const randInt = max => {
	const num = (Math.floor(Math.random() * max)) + 1;
	return num;
}

const io = new ServerIO(server);
const ioController = new IOController(io);
const connectionListener = socket => {
	ioController.registerSocket(socket);
	//Avec ce code nous avons des valeurs différentes pour chaque client
	//Avec l'utilisation de la classe ioController on réussi à avoir le même nombre renvoyé au même moment 
	//console.log(`connection with the id : ${socket.id}`);
	//setInterval(() => socket.emit("randInt",randInt(10)), 2000);
}

io.on('connection', connectionListener);

server.listen(8080);
