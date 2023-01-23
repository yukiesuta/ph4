// ベクトル
class Vec {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

// 長方形
class Rect {
    constructor(w, h) {
        this.pos = new Vec;
        this.size = new Vec(w, h);
    }
}

// ボール
class Ball extends Rect {
    constructor() {
        super(10, 10);
        // vel:速さ
        this.vel = new Vec;
    }
}

// 環境
class Pong{
    constructor(canvas){
        this._canvas=canvas;
        this._context=canvas.getContext("2d");
    }
}


const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");


const ball = new Ball;
ball.pos.x = 1;
ball.pos.y = 1;
console.log(ball);

ball.vel.x = 10;
ball.vel.y = 10;

let lastTime;

function callback(millis) {

    if (lastTime) {
        update((millis - lastTime) / 10);
    }
    lastTime = millis;
    requestAnimationFrame(callback);
}

function update(dt) {
    ball.pos.x += ball.vel.x * dt
    ball.pos.y += ball.vel.y * dt

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (ball.pos.x < 0 || ball.pos.x > canvas.width) {
        ball.vel.x = -ball.vel.x;
    }
    if (ball.pos.y < 0 || ball.pos.y > canvas.height) {
        ball.vel.y = -ball.vel.y;
    }

    context.fillStyle = "white";
    context.fillRect(ball.pos.x, ball.pos.y, ball.size.x, ball.size.y);
}

callback();