"use strict";


const canvas = document.getElementById("canvas");
const canvasWidth = 1200;
const canvasHeight = 500;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
const context = canvas.getContext("2d");
const numberOfBalls = 9;
const BallCollection = [];
const maxBallSize = 50;
const minBallSize = 20;
const maxBallSpeed = 6;
const minBallSpeed = 3;
let hslVal = 0;

function randomSpeed (min, max) {

   // const trueOrFalse = [true, false];
   // const chosen = trueOrFalse[Math.floor(Math.random() * trueOrFalse.length)];
   // chosen ? 
   return Math.floor(Math.random() * (max - min) + min);

};

function randomLocation (xlength, ylength) {
   return [Math.random() * xlength, Math.random() * ylength];
};

// Ball's blueprint for making multiple balls
class Ball {
   constructor (x, y, vx, vy, radius, colorShiftSpeed, maxBallSize, minBallSize, maxBallSpeed, minBallSpeed) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.radius = radius;
      this.color = null;
      this.hslVal = 0;
      this.colorShiftSpeed = colorShiftSpeed;
      this.maxBallSize = maxBallSize;
      this.minBallSize = minBallSize;
      this.randomChoises = [true, false];
      this.maxBallSpeed = maxBallSpeed;
      this.minBallSpeed = minBallSpeed;
   }


   drawBall () {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fillStyle = this.color;
      context.fill();
      context.closePath();
   }

   moveBall () {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x + this.radius >= canvasWidth || this.x - this.radius <= 0){
         this.vx *= -1;
      };
      if (this.y + this.radius >= canvasHeight || this.y - this.radius <= 0){
         this.vy *= -1;
      };
      if (this.x + this.radius >= canvasWidth){
         this.x -= (this.radius / 2) / 2;
      };
      if (this.x - this.radius <= 0){
         this.x = this.radius;
      };
      if (this.y + this.radius >= canvasHeight){
         this.y -= (this.radius / 2) / 2;
      };
      if (this.y - this.radius <= 0){
         this.y = this.radius;
      };
   }

   colorShift() {
      this.hslVal += this.colorShiftSpeed;
      this.color = `hsl(${this.hslVal}, 100%, 50%)`;
   }

   randomSize() {
      this.radius = Math.random() * (this.maxBallSize - this.minBallSize) + this.minBallSize;
   }

   randomSpeedShift() {
      // this.vx++;
      // this.vy++;


      const bool = this.randomChoises[Math.floor(Math.random() * this.randomChoises.length)];
      if (bool) {
         console.log("true");
         this.vx < this.maxBallSpeed ? this.vx++ : this.vx = this.vx;
         this.vy < this.maxBallSpeed ? this.vy++ : this.vy = this.vy;
      }; 
      if (!bool) {
         console.log("false");
         this.vx > this.minBallSpeed ? this.vx-- : this.vx = this.vx;
         this.vy > this.minBallSpeed ? this.vy-- : this.vy = this.vy;
      };
      // const bool = this.randomChoises[Math.floor(Math.random() * this.randomChoises.length)]; 
      // if (bool) {
         // this.vx < this.maxBallSpeed ? this.vx++ : this.vx = this.vx;
      // } else {
         // this.vy < this.maxBallSpeed ? this.vy++ : this.vy = this.vy;
      // }
   }
};


// Create multiple balls using for...loop
for (let i = 0; i < numberOfBalls; i++){
   const randomPoint = randomLocation(canvasWidth, canvasHeight);
   BallCollection.push(new Ball(
      randomPoint[0], // random x point
      randomPoint[1], // random y point 
      0.1,  // random speed vx
      0.5,  // random speed vy
      null, // random radius
      Math.random() * 3, // color shift speed
      50,   // max size 
      5, // min size
      5, // max ball speed
      -5 // min ball speed
   ));
   BallCollection[i].randomSize();
};


// Create animation frame rate with requestAnimationFrame()
function animationFrame() {
   requestAnimationFrame(animationFrame);
   context.fillStyle = "rgba(0, 0, 0, 0.2)";
   context.fillRect(0, 0, canvasWidth, canvasHeight);
   const ballNumber = BallCollection.length;
   for (let i = 0; i < ballNumber; i++){
      BallCollection[i].drawBall();
      BallCollection[i].moveBall();
      BallCollection[i].colorShift();
      // BallCollection[i].randomSize();
      BallCollection[i].randomSpeedShift();
   };
};

animationFrame();