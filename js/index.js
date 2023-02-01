// ベクトル
class Vec {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
}

function setup() {
    for (let i = 0; i < 24; i++) {
        let p = new Vec(50 * (i % 8) + 120, 50 + 40 * Math.floor(i / 8));
        blocks.push(new Block(p, 20));
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
    constructor(_p, _v,_c) {
        super(10, 10);
        this.p = _p;
        this.v = _v;
        this.c = _c;
    }
}

class Paddle extends Rect {
    constructor(_p) {
        super(10, 10);
        this.p = _p;
    }
}

class Block extends Rect {
    constructor(_p, _r) {
        super(10, 10);
        this.p = _p;
        this.r = _r;
    }
}


const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

let balls = [];

balls[1] = new Ball(
    new Vec(1, 1),
    new Vec(200, 200),
    'blue'
);
balls[0] = new Ball(
    new Vec(10, 5),
    new Vec(300, 300),
    'red'
);
balls[2] = new Ball(
    new Vec(10, 52),
    new Vec(400, 400),
    'green'
);
// balls[3] = new Ball(
//     new Vec(10, 53),
//     new Vec(300, 200),
//     'yellow'
// );

const paddle = new Paddle(
    new Vec(50, 30)
);

let blocks = [];



let lastTime;

function callback(millis) {



    if (lastTime) {
        update((millis - lastTime) / 10);
    }
    lastTime = millis;
    requestAnimationFrame(callback);
}

document.addEventListener("mousemove", function (e) {
    paddle.p.x = e.clientX
});

function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let ball of balls) {
        ball.p.x += ball.v.x * 1 / 50;
        ball.p.y += ball.v.y * 1 / 50;



        if (ball.p.x < 0 || ball.p.x > canvas.width) {
            ball.v.x = -ball.v.x;
        }
        if (ball.p.y < 0 || (ball.v.y > 0 && paddle.p.x - 100 < ball.p.x && paddle.p.x + 100 > ball.p.x && ball.p.y > 320&& ball.p.y < 325)) {
            ball.v.y = -ball.v.y;
        }
        if (ball.p.y > canvas.height-10) {
        var str = 'ドンマイ！笑';
        balls =[];
        blocks=[1];
        var myh1 = document.getElementById("myh1");
        myh1.innerHTML = str;

        }
        for (let block of blocks) {
            let blockx = block.p.x;
            let blocky = block.p.y;

            if (blockx - 10 < ball.p.x && blockx + 10 > ball.p.x && blocky + 10 > ball.p.y && blocky - 10 < ball.p.y) {

                ball.v.y = -ball.v.y;
                blocks.splice(blocks.indexOf(block), 1);
            }
        }
        context.fillStyle = ball.c;
        context.fillRect(ball.p.x, ball.p.y, ball.size.x, ball.size.y);
    }
    


    context.fillStyle = "blue";
    context.fillRect(paddle.p.x - 100, 330, 200, 20);

    for (let b of blocks) {
        context.fillStyle = "red";
        context.fillRect(b.p.x, b.p.y, 20, 5);
    }
    if (blocks.length < 10) {

    }
    if (blocks.length < 1) {
        var str = 'おめでと笑';
        balls =[];
        blocks=[];
        var myh1 = document.getElementById("myh1");
        myh1.innerHTML = str;
    }
}
setup();
callback();