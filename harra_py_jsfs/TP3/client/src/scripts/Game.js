import Ball from './Ball.js';
import Paddle from './Paddle.js';

/**
 * a Game animates a ball bouncing in a canvas
 */
export default class Game {

  #socket
  #player

  /**
   * build a Game
   *
   * @param  {Canvas} canvas the canvas of the game
   */
  constructor(canvas) {
    this.raf = null;
    this.canvas = canvas;
    this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, this);
    this.paddle = new Paddle(this.canvas.width/10, this.canvas.height/2.5, this);
    this.paddle2 = new Paddle(this.canvas.width - (this.canvas.width/10 + this.paddle.width), this.canvas.height/2.5, this);
    this.scoreP1 = 0;
    this.scoreP2 = 0;
    this.isPaddle2 = false;
    this.#player = document.getElementById('player');
  }

  connexion() {
    this.#socket = io();
    this.#socket.on('connexion', playerNb => this.displayPlayer(playerNb));
    this.#socket.on('failed', () => this.failedConnexion());
    this.#socket.on('moveDown', () => this.paddle2.moveDown());
    this.#socket.on('moveUp', () => this.paddle2.moveUp());
    this.#socket.on('stopMoving', () => this.paddle2.stopMoving());
    this.#socket.on('start', () => this.animate());
  }

  /** start this game animation */
  start() {
    this.animate();
  }

  /** stop this game animation */
  stop() {
    window.cancelAnimationFrame(this.raf);
  }

  disconnect() {
    this.#socket.disconnect(true);
  }

  /** animate the game : move and draw */
  animate() {
    this.moveAndDraw();
    this.displayScore();
    this.raf = window.requestAnimationFrame(this.animate.bind(this));
  }
  /** move then draw the bouncing ball */
  moveAndDraw() {
    const ctxt = this.canvas.getContext("2d");
    ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // draw and move the ball  
    this.ball.move();
    this.ball.draw(ctxt);

    // draw and move the paddle
    this.paddle.move();
    this.paddle.draw(ctxt);
    
    //draw and move the second paddle
    this.paddle2.move();
    this.paddle2.draw(ctxt);

    if(this.ball.collisionWith(this.paddle)) {
      this.isPaddle2 = false;
      this.directionCollision(this.paddle);
    }
    else if (this.ball.collisionWith(this.paddle2)){
      this.isPaddle2 = true;
      this.directionCollision(this.paddle2);
    }
    else {
      this.ball.draw(ctxt);
    }
  }

  directionCollision(paddle) {
      let ballY = this.ball.y + this.ball.height/2;
      let paddleY = paddle.y + paddle.height/2;
      let delta = (paddle.height/2) /4;
      let zoneColl = -(paddleY - ballY)/delta;

      if (this.isPaddle2){
        this.ball.shiftX = - (9 - Math.abs(zoneColl));
        this.ball.shiftY = - zoneColl;
      } else {
        this.ball.shiftX = 9 - Math.abs(zoneColl);
        this.ball.shiftY = zoneColl;
      }
  }

  keyDownActionHandler(event) { 
    switch (event.key){
      case "ArrowDown":
      case "Down":
        this.#socket.emit('moveDown');
        this.paddle.moveDown();
        break;
      case "ArrowUp":
      case "Up":
        this.#socket.emit('moveUp');
        this.paddle.moveUp();
        break;
        /*
      case "z":
      case "Up":
        this.paddle.moveUp();
        */
        break;
      case " ":
        this.reload();
      default: return;  
    }
    event.preventDefault();
  }
  
  keyUpActionHandler(event) { 
    switch (event.key){
      case " ":
        this.stop();
        this.start();
        break;
      case "ArrowDown": 
      case "Down":
        this.#socket.emit('stopMoving');
        this.paddle.stopMoving();
        break;
      case "ArrowUp":
      case "Up":
        this.#socket.emit('stopMoving');
        this.paddle.stopMoving();
        break;
      default: return;  
    }
    event.preventDefault();
  }

  reload() {
    document.getElementById("start").blur();
    this.displayScore();
    this.ball.reloadBall();
  }
  
  displayScore(){
    var scoreP1Elt = document.getElementById("scoreP1"); 
    var scoreP2Elt = document.getElementById("scoreP2"); 
    if(!scoreP1Elt){
      var scoreP1Elt = document.createElement("span");
      scoreP1Elt.id = "scoreP1";
    }
    scoreP1Elt.textContent = " Player 1 : " + this.scoreP1;
    
    if(!scoreP2Elt){
      var scoreP2Elt = document.createElement("span");
      scoreP2Elt.id = "scoreP2";
    }
    scoreP2Elt.textContent = "Player 2 : " + this.scoreP2;

    var controls = document.getElementById("start");
    document.getElementById("start").parentNode.insertBefore(scoreP1Elt, controls);
    document.getElementById("controls").appendChild(scoreP2Elt);  
  }
  
  displayPlayer(playerNb){
    console.log('player handle ' + playerNb);
    if(playerNb == 1) {
      this.#player.innerHTML = 'Player 1';
    } else if (playerNb == 2) {
      this.#player.innerHTML = 'Player 2';
    } else {
      this.failedConnexion();
    }
  }

  failedConnexion() {
    this.#player.innerHTML = "Plus de place";
    document.getElementById('start').style.visibility = 'hidden';
  }

  playerLeave() {
    this.#player.innerHTML = "Un joueur est parti"; 
    this.#socket.broadcast.emit('disconnect');
    this.disconnect();
  }
}
