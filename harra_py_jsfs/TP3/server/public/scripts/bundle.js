(()=>{"use strict";class t{constructor(t,e,i,s=0,h=0){this.y=e,this.x=t,this.img=new Image,this.img.src=i,this.shiftX=s,this.shiftY=h}get width(){return this.img.width}get height(){return this.img.height}move(){this.x=this.x+this.shiftX,this.y=this.y+this.shiftY}draw(t){t.drawImage(this.img,this.x,this.y)}stopMoving(){this.shiftX=0,this.shiftY=0}}class e extends t{constructor(t,e,i){super(t,e,"./images/balle24.png",4,2),this.theGame=i}move(){this.y<=0||this.y+this.height>=this.theGame.canvas.height?this.shiftY=-this.shiftY:this.x+this.width>=this.theGame.canvas.width?(this.stopMoving(),this.theGame.scoreP1++,this.theGame.reload()):this.x<=0&&(this.stopMoving(),this.theGame.scoreP2++,this.theGame.reload()),super.move()}collisionWith(t){let e=[Math.max(this.x,t.x),Math.max(this.y,t.y)],i=[Math.min(this.x+this.width,t.x+t.width),Math.min(this.y+this.width,t.y+t.height)];return e[0]<i[0]&&e[1]<i[1]}reloadBall(){this.y=this.theGame.canvas.height/2,this.x=this.theGame.canvas.width/2,this.shiftX=4,this.shiftY=2}}class i extends t{constructor(t,e,i){super(t,e,"./images/paddle.png",8,4),this.moveState={UP:0,DOWN:1,NONE:2},this.moving=this.moveState.NONE,this.theGame=i}moveUp(){this.moving=this.moveState.UP}moveDown(){this.moving=this.moveState.DOWN}stopMoving(){this.moving=this.moveState.NONE}move(){(this.y<=0||this.y+this.height>=this.theGame.canvas.height)&&(this.shiftY=-this.shiftY),this.moving==this.moveState.UP&&(this.y=Math.max(0,this.y-8)),this.moving==this.moveState.DOWN&&this.y+this.img.height<=this.theGame.canvas.height&&(this.y=Math.max(0,this.y+8))}}class s{#t;#e;constructor(t){this.raf=null,this.canvas=t,this.ball=new e(this.canvas.width/2,this.canvas.height/2,this),this.paddle=new i(this.canvas.width/10,this.canvas.height/2.5,this),this.paddle2=new i(this.canvas.width-(this.canvas.width/10+this.paddle.width),this.canvas.height/2.5,this),this.scoreP1=0,this.scoreP2=0,this.isPaddle2=!1,this.#e=document.getElementById("player")}connexion(){this.#t=io(),this.#t.on("connexion",(t=>this.displayPlayer(t))),this.#t.on("failed",(()=>this.failedConnexion())),this.#t.on("moveDown",(()=>this.paddle2.moveDown())),this.#t.on("moveUp",(()=>this.paddle2.moveUp())),this.#t.on("stopMoving",(()=>this.paddle2.stopMoving())),this.#t.on("start",(()=>this.animate()))}start(){this.animate()}stop(){window.cancelAnimationFrame(this.raf)}disconnect(){this.#t.disconnect(!0)}animate(){this.moveAndDraw(),this.displayScore(),this.raf=window.requestAnimationFrame(this.animate.bind(this))}moveAndDraw(){const t=this.canvas.getContext("2d");t.clearRect(0,0,this.canvas.width,this.canvas.height),this.ball.move(),this.ball.draw(t),this.paddle.move(),this.paddle.draw(t),this.paddle2.move(),this.paddle2.draw(t),this.ball.collisionWith(this.paddle)?(this.isPaddle2=!1,this.directionCollision(this.paddle)):this.ball.collisionWith(this.paddle2)?(this.isPaddle2=!0,this.directionCollision(this.paddle2)):this.ball.draw(t)}directionCollision(t){let e=this.ball.y+this.ball.height/2,i=-(t.y+t.height/2-e)/(t.height/2/4);this.isPaddle2?(this.ball.shiftX=-(9-Math.abs(i)),this.ball.shiftY=-i):(this.ball.shiftX=9-Math.abs(i),this.ball.shiftY=i)}keyDownActionHandler(t){switch(t.key){case"ArrowDown":case"Down":this.#t.emit("moveDown"),this.paddle.moveDown();break;case"ArrowUp":case"Up":this.#t.emit("moveUp"),this.paddle.moveUp();break;case" ":this.reload();default:return}t.preventDefault()}keyUpActionHandler(t){switch(t.key){case" ":this.stop(),this.start();break;case"ArrowDown":case"Down":case"ArrowUp":case"Up":this.#t.emit("stopMoving"),this.paddle.stopMoving();break;default:return}t.preventDefault()}reload(){document.getElementById("start").blur(),this.displayScore(),this.ball.reloadBall()}displayScore(){var t=document.getElementById("scoreP1"),e=document.getElementById("scoreP2");t||((t=document.createElement("span")).id="scoreP1"),t.textContent=" Player 1 : "+this.scoreP1,e||((e=document.createElement("span")).id="scoreP2"),e.textContent="Player 2 : "+this.scoreP2;var i=document.getElementById("start");document.getElementById("start").parentNode.insertBefore(t,i),document.getElementById("controls").appendChild(e)}displayPlayer(t){console.log("player handle "+t),1==t?this.#e.innerHTML="Player 1":2==t?this.#e.innerHTML="Player 2":this.failedConnexion()}failedConnexion(){this.#e.innerHTML="Plus de place",document.getElementById("start").style.visibility="hidden"}playerLeave(){this.#e.innerHTML="Un joueur est parti",this.#t.broadcast.emit("disconnect"),this.disconnect()}}window.addEventListener("load",(()=>{const t=document.getElementById("field"),e=new s(t);document.getElementById("start").addEventListener("click",(()=>a(e))),window.addEventListener("keydown",e.keyDownActionHandler.bind(e)),window.addEventListener("keyup",e.keyUpActionHandler.bind(e))}));let h=!1;const a=t=>{h?(document.getElementById("start").value="Connexion",t.playerLeave(),t.stop()):(t.connexion(),document.getElementById("start").value="Déconnexion"),h=!h}})();