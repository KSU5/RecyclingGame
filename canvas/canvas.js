/*var Vector2d = function(x,y){
    this.x = x;
    this.y = y;
};

function vector_addition(v1, v2){
    return new Vector2d(v1.x + v2.x, v1.y + v2.y);
}

function vector_subtraction(v1, v2){
    return new Vector2d(v1.x - v2.x, v1.y - v2.y);
}

function vector_scalar_multiplicaton(v1, s){
    return new Vector2d (v1.x * s, v1.y * s);
}

function vector_length(v1){
    return Math.sqrt(v1.x * v1.x + v1.y * v1.y);
}

function vector_normalize(v1){
    
}*/




var canvas = document.getElementById("game_layer");
var context = canvas.getContext("2d");

function Player(x, y ){
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 15;
    this.direction = -1;
}
Player.prototype.draw = function(){
    context.fillStyle = "gold";
    context.fillRect(this.x, this.y, this.width, this.height);
};

function Enemy(x, y){
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.direction = -1;
}
Enemy.prototype.draw = function(){
    context.fillStyle = "green";
    context.fillRect(this.x, this.y, this.width, this.height);
};
Enemy.prototype.update = function(){
    this.y = this. y + this.direction;
    if (this. y <= 0 || this.y + this.height >= canvas.height){
        this.direction = this.direction * -1;
    }

}

var player1 = new Player(100, 175);
var enemy1 = new Enemy(20,25);
var enemy2 = new Enemy(50,25);
var enemy3 = new Enemy(100,25);


function execution() {
    var canvas = document.getElementById("game_layer");
    var context = canvas.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    player1.draw();

    enemy1.update();
    enemy1.draw();

    enemy2.update();
    enemy2.draw();

    enemy3.update();
    enemy3.draw();

    window.requestAnimationFrame(execution);

}

execution();
