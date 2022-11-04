export default class IOController {
    #io;
    #clients;

    constructor(io, socket) {
        this.#io = io;
        this.#clients = new Map();
        setInterval((this.randInt.bind(this)), 2000);
    }

    registerSocket(socket) {
        console.log(`new connection with the id : ${socket.id}`);
        this.setupListeners(socket);
    }

    setupListeners(socket) {
        socket.on( 'greatings' , user => this.greatings(socket, user.name) );
        socket.on( 'disconnect' , () => this.leave(socket) );
    }

    greatings(socket, userName) {
        console.log(`greatings received from ${userName} (id : ${socket.id})`);
        this.#clients.set(socket.id, userName);
        socket.emit('Bienvenue');
    } 

    leave(socket) {
        const userName = 'unknow' || this.#clients.get(socket.id);
        console.log(`disconnection from ${socket.id} (user : ${userName})`); 
    }

    randInt() {
        const num = (Math.floor(Math.random() * 10)) + 1;
        this.#io.emit('randInt', num);
        console.log("Nombre aléatoire envoyé ");
        return num;
    }

}