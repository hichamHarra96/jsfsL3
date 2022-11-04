import Mobile from './Mobile.js';


// default values for a Ball : image and shifts
const BALL_IMAGE_SRC = './images/balle24.png';
const SHIFT_X = 4;
const SHIFT_Y = 2;

/**
 * a Ball is a mobile with a ball as image and that bounces in a Game (inside the game's canvas)
 */
export default class Ball extends Mobile {

  /**  build a ball
   *
   * @param  {number} x       the x coordinate
   * @param  {number} y       the y coordinate
   * @param  {Game} theGame   the Game this ball belongs to
   */
  constructor(x, y, theGame) {
    super(x, y, BALL_IMAGE_SRC , SHIFT_X, SHIFT_Y);
    this.theGame = theGame;
  }

  /**
   * when moving a ball bounces inside the limit of its game's canvas
   */
  move() {
    if (this.y <= 0 || (this.y+this.height >= this.theGame.canvas.height)) {
      this.shiftY = - this.shiftY;    // rebond en haut ou en bas
    }
    else if (this.x + this.width >= this.theGame.canvas.width ) { // fin si rebond à droite 
      this.stopMoving();
      this.theGame.scoreP1 ++;
      this.theGame.reload();
    }
    else if (this.x <= 0 ){ // Fin si rebond à gauche      
      this.stopMoving();
      this.theGame.scoreP2 ++;
      this.theGame.reload();
    }
    super.move();
  }

  collisionWith(paddle){
    let p1 = [Math.max(this.x, paddle.x), Math.max(this.y, paddle.y)];
    let p2 = [Math.min(this.x + this.width, paddle.x + paddle.width), Math.min(this.y + this.width, paddle.y + paddle.height)];
    
    return p1[0] < p2[0] && p1[1] < p2[1];
  }

  reloadBall() {
    this.y = this.theGame.canvas.height/2;
    this.x = this.theGame.canvas.width/2;
    this.shiftX = SHIFT_X;
    this.shiftY = SHIFT_Y;
  }
}
