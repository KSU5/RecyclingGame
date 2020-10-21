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
*/







document.addEventListener("keydown",key_down_handler,false);
document.addEventListener("keyup",key_up_handler,false);
document.addEventListener("keypress",key_press_handler,false);


var canvas = document.getElementById("game_layer");
var context = canvas.getContext("2d");

var move_left = false;
var move_right = false;
var weapon_up = false;
var weapon_down = false;
var weapon_shoot = false;

function key_down_handler(event){
    if(event.keyCode == 39){
        move_right = true;
    }
    else if(event.keyCode == 37){
        move_left = true;
    }

}

function key_up_handler(event){
    if(event.keyCode == 39){
        move_right = false;
    }
    else if(event.keyCode == 37){
        move_left = false;
    }

}

function key_press_handler(event){
    if(event.keyCode == 38){
        weapon_up = true;
    }   
    else if(event.keyCode == 40){
        weapon_down = true;
    }
    else if(event.keyCode == 32){
        weapon_shoot = true;
    }

}

function Projectile(x, y){
    this.x = x;
    this.y = y;
    this.width = 1;
    this.height = 5;
    this.speedy = 3;
}
Projectile.prototype.draw = function(){
    context.fillStyle = "blue";
    context.fillRect(this.x, this.y, this.width, this.height);
}
Projectile.prototype.update = function(){
    if(weapon_shoot){
        this.x =  player_x;
        this.y -= this.speedy;
    }
}


function Player(x, y ){
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 15;
    this.speedx = 0.6;
    this.hp = 3;
}
Player.prototype.draw = function(){
    context.fillStyle = "gold";
    context.fillRect(this.x, this.y, this.width, this.height);
};

Player.prototype.update = function(){
    if (move_right){
        this.x += this.speedx;
        player_x = this.x;
    }
    else if(move_left){
        this.x -= this.speedx;
        player_x = this.x;
    }
    
}

function Enemy(x, y){
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.direction = -1;
    this.speedy = 0.1
}
Enemy.prototype.draw = function(){
    context.fillStyle = "green";
    context.fillRect(this.x, this.y, this.width, this.height);
};

Enemy.prototype.update = function(){
    this.y = this. y + this.direction * this.speedy;
    if (this. y <= 0 || this.y + this.height >= canvas.height){
        this.direction = this.direction * -1;
    }

}

var player_x = canvas.width/2;
var player_y = 175;
var player1 = new Player(player_x, player_y);
var projectile = new Projectile(player_x,player_y);
var enemy1 = new Enemy(20,25);
var enemy2 = new Enemy(50,25);
var enemy3 = new Enemy(100,25);


function execution() {
    var canvas = document.getElementById("game_layer");
    var context = canvas.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    player1.update();
    player1.draw();

  
    if(weapon_shoot){
        projectile.update();
        projectile.draw();
    }
       

    enemy1.update();
    enemy1.draw();

    enemy2.update();
    enemy2.draw();

    enemy3.update();
    enemy3.draw();

    window.requestAnimationFrame(execution);

}

execution();
