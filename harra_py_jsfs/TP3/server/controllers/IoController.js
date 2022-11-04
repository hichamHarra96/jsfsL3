export default class IOController {
    #io;
    #clients;

    constructor(io, socket) {
        this.#io = io;
        this.#clients = new Map();
    }

    registerSocket(socket) {
        socket.on('moveDown', () => socket.broadcast.emit('moveDown'));
        socket.on('moveUp', () => socket.broadcast.emit('moveUp'));
        socket.on('stopMoving', () => socket.broadcast.emit('stopMoving'));

        if(this.#clients.size < 2){  
            const playerNb = this.#clients.size+1;
            console.log(`new connection with the id ${socket.id} player${playerNb}`);

            this.#clients.set(socket.id, playerNb);
            this.setupListeners(socket, playerNb);
            console.log("player " + playerNb);
            if(playerNb == 2 ){
                socket.broadcast.emit('start');
            }
        } else {
            this.denyAccess(socket);
        }
        console.log("size " + this.#clients.size);
    }

    setupListeners(socket, playerNb) {
        socket.emit('connexion', playerNb);
        socket.on('disconnect', () => this.leave(socket, playerNb));
    }
    
    leave(socket, playerNb) {
        socket.broadcast.emit('playerLeave', playerNb);
        console.log(playerNb);
        this.#clients.delete(socket.id);
        console.log(`disconnection from ${socket.id} (player : ${playerNb})`);
        socket.disconnect(true);
    }

    denyAccess(socket) {
        console.log(`Accès refusé pour ${socket.id}`);
        socket.emit('failed');
        this.leave(socket);
    }


}