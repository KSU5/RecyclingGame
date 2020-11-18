//ENEMY PROJECTILES
//GAME BACKGROUND IMAGE
//HP BOX HEARTS
//ASTRONAUT TALKING WHEN ENEMY TYPE GENERATED
//UPDATE COLLISION DETECTION SO THAT IT CHECKS ENEMY ROWS YOU ADDED

//MAYBE HARD DIFFICULTY WHERE EACH ROW = DIFFERENT TYPE OF ENEMY
//IF THIS IS ADDED THEN UPDATE PROJECTILE TO NOT GO THRU ENEMIES?

//DO THIS//
//IF ENEMIES GET TO BOTTOM THEN LOSE A LIFE AND THEY GO BACK TO TOP
//DO THIS//


document.addEventListener("keydown",key_down_handler,false);
document.addEventListener("keyup",key_up_handler,false);
document.addEventListener("keypress",key_press_handler,false);


var canvas = document.getElementById("game_layer");
var context = canvas.getContext("2d");

var enemyFiring = false;

var move_left = false;
var move_right = false;
var weapon_up = false;
var weapon_down = false;
var weapon_shoot = false;
var playerWidth = 45;
var playerHeight = 60;
var projectileWidth = 6;
var projectileHeight = 10;
var enemyWidth = 30;
var enemyHeight = 30;
var enemiesKilled = 0;

var HP = 3;

//trash and weaponNames indexes coordinate with eachother
var trash = ["textile", "recycling", "compost"];
var textileEnemies = ["socks", "jeans", "shirts"];
var recyclingEnemies = ["cans", "paper", "plastic bottles"];
var compostEnemies = ["pizza", "apples", "broccoli"];
//var specEnemies = ["socks", "jeans", "shirts", "cans", "paper", "plastic bottles", "pizza", "apple", "broccoli"];
var weaponNames = ["Trash Teleporter", "Recycling Rocket", "Compost Cannon"];
var currWeapon = 0;
var gameRunning = false;
//
var leftMostCol = 0;
var rightMostCol = 9;

var score = 0;

//Database Initilization
const database = firebase.firestore();
const scores = database.collection('scores');

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
    else if(event.keyCode == 38)
    {
        //if the weapon isnt fired then we update both projectile type and increment currWeapon
        if(!weapon_shoot)
        {
            //document.write("UP");
            if(currWeapon==(trash.length-1))
            {
                currWeapon = 0;
                projectile.trashType = trash[currWeapon];
                updateWeaponBox(currWeapon);
            }
            else
            {
                currWeapon++;
                projectile.trashType = trash[currWeapon];
                updateWeaponBox(currWeapon);
            }
        }
        else //else the projectile is on screen so we only increment the currWeapon
        {
            if(currWeapon==(trash.length-1))
            {
                currWeapon = 0;
                updateWeaponBox(currWeapon);
            }
            else
            {
                currWeapon++;
                updateWeaponBox(currWeapon);
            }
        }
    }
    else if(event.keyCode == 40)
    {
        //if the weapon isnt fired then we update both projectile type and decrement currWeapon
        if(!weapon_shoot)
        {
            if(currWeapon==0)
            {
                currWeapon = (trash.length-1);
                projectile.trashType = trash[currWeapon];
                updateWeaponBox(currWeapon);
            }
            else
            {
                currWeapon--;
                projectile.trashType = trash[currWeapon];
                updateWeaponBox(currWeapon);
            }
        }
        else //else the projectile is on screen so we only decrement the currWeapon
        {
            if(currWeapon==0)
            {
                currWeapon = (trash.length-1);
                updateWeaponBox(currWeapon);
            }
            else
            {
                currWeapon--;
                updateWeaponBox(currWeapon);
            }
        }
    }
    else if(event.keyCode == 81)
    {
        if(gameRunning)
        {
            textBox.textContent = "Press the q key to resume the game!";
            gameRunning = false;
        }
        else
        {
            astronautTalks(enemyNums);
            gameRunning = true;
        }
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
        //if projectile isnt on screen then we set its x coordinate to be the middle of the ship
        if(!weapon_shoot)
        {
            projectile.x = player_x + (playerWidth/2) - (projectile.width/2);
        }

        //if game isnt paused
        if(gameRunning){
        weapon_shoot = true;}
    }
    //Press 'shift + L' to instantly lose the game. Rip this out on final build
    else if(event.keyCode == 76)
    {
        youLose();
    }
}

function Projectile(x, y){
    this.x = x;
    this.y = y;
    this.width = projectileWidth;
    this.height = projectileHeight;
    this.speedy = 3;
    this.trashType = trash[currWeapon];
    this.img = new Image(this.x, this.y);
}
Projectile.prototype.draw = function(){
    if(this.trashType == "textile"){
        this.img.src = "assets/textileBullet.png";
    }
    else if(this.trashType == "recycling"){
        this.img.src = "assets/recycleBullet.png";
    }
    else if(this.trashType == "compost"){
        this.img.src = "assets/compostBullet.png";
    }
    context.drawImage(this.img, this.x, this.y);
    //if the projectile reaches the top of the game, set weapon_shoot to false, reset projectile y val and change projectile type to currWeapon
    if(this.y <= 0)
    {
        weapon_shoot = false;
        this.y = player_y - (projectileHeight/2);
        projectile.trashType = trash[currWeapon];
    }

}
Projectile.prototype.update = function(){
    if(weapon_shoot){
        this.y -= this.speedy;
    }
}


function Player(x, y, user_id){
    this.id = user_id;
    this.x = x;
    this.y = y;
    this.width = playerWidth;
    this.height = playerHeight;
    this.speedx = 0.6;
    this.hp = 3;
    this.img = new Image();
    this.img.src = "resizedAssets/spaceship.png";
}
Player.prototype.draw = function(){
    context.drawImage(this.img, this.x, this.y);
};

Player.prototype.update = function(){
    if (move_right){
        if((this.x+this.width) >= canvas.width)
        {
            this.x = canvas.width - this.width;
        }
        else
        {
            this.x += this.speedx;
            player_x = this.x;
        }
    }
    else if(move_left){
        if(this.x <= 0)
        {
            this.x == 0;
        }
        else
        {
            this.x -= this.speedx;
            player_x = this.x;
        }
    }
    if(user_id == null){
        this.user_id = "Unknown Player";
    }else{
        this.user_id = user_id;
    }
    
};

function Enemy(x, y){
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.direction = -1;
    this.speedy = 0.2;
    this.alive = true;
    this.trashType;
    this.specTrashType;
    this.weapon = new Projectile(this.x, this.y);
    this.img = new Image();
}
Enemy.prototype.draw = function()
{
    if(this.alive)
    {
        if(this.specTrashType == textileEnemies[0]){this.img.src="resizedAssets/textenemy2.png";}
        else if(this.specTrashType == textileEnemies[1]){this.img.src="resizedAssets/textenemy1.png";}
        else if(this.specTrashType == textileEnemies[2]){this.img.src="resizedAssets/textenemy3.png";}
        else if(this.specTrashType == recyclingEnemies[0]){this.img.src="resizedAssets/recycenemy1.png";}
        else if(this.specTrashType == recyclingEnemies[1]){this.img.src="resizedAssets/recycenemy2.png";}
        else if(this.specTrashType == recyclingEnemies[2]){this.img.src="resizedAssets/recycenemy3.png";}
        else if(this.specTrashType == compostEnemies[0]){this.img.src="resizedAssets/compenemy1.png";}
        else if(this.specTrashType == compostEnemies[1]){this.img.src="resizedAssets/compenemy2.png";}
        else if(this.specTrashType == compostEnemies[2]){this.img.src="resizedAssets/compenemy3.png";}
        //context.fillStyle = "green";
        context.drawImage(this.img, this.x, this.y);
    }
    else
    {
        //if not alive, remove from screen by making coordinates large and negative
        //may be better way to do this
        //this.x=-1000;
        //this.y=-1000;
        //context.fillStyle = 'rgba(225,225,225,0.5)';
        //context.fillRect(this.x,this.y,this.width,this.height);
    }
};

Enemy.prototype.update = function(){

    this.x = this.x + this.direction * this.speedy;
    //if the 1st or Last enemy hits the canvas end, drop and switch directions
    /* if(this == enemy1)
    {
        if(!enemyFiring)
        {
            enemyFiring = true;
        }
        else
        {
            if(enemy1.weapon.y >= canvas.height)
            {
                enemyFiring = false;
                enemy1.weapon.y == -1000;
            }
        }
    } */
    if (leftEnemy.x <= 0){
        enemiesDrop("l");
    }
    else if(rightEnemy.x + this.width >= canvas.width)
    {
        enemiesDrop("r");
    }
    /* if (leftEnemy.x <= 0 || rightEnemy.x + this.width >= canvas.width){
        this.direction = this.direction * -1;
        this.y += (this.height/2);
    } */
    if(this.y >= player_y - (playerHeight/2) && this.alive)
    {
        respawnAliveEnemies(enemies);
    }
    
}

function enemiesDrop(dir)
{
    if(dir == "l"){
        for(var i = 0; i < 10; i++)
        {
            if(i == leftMostCol)
            {
                enemiesR3[i].x = 1;
                enemiesR2[i].x = 1;
                enemiesR1[i].x = 1;
                enemiesR3[i].direction = enemiesR3[i].direction * -1;
                enemiesR2[i].direction = enemiesR2[i].direction * -1;
                enemiesR1[i].direction = enemiesR1[i].direction * -1;
                enemiesR3[i].y += (enemyHeight/2);
                enemiesR2[i].y += (enemyHeight/2);
                enemiesR1[i].y += (enemyHeight/2);
            }
            else if(i > leftMostCol){
                //if(enemiesR3[i].alive){
                    enemiesR3[i].x = enemiesR3[i-1].x+54;
                    enemiesR3[i].y += (enemyHeight/2)
                    enemiesR3[i].direction = enemiesR3[i].direction * -1;
                //}
                //if(enemiesR2[i].alive){
                    enemiesR2[i].x = enemiesR2[i-1].x+54;
                    enemiesR2[i].y += (enemyHeight/2);
                    enemiesR2[i].direction = enemiesR2[i].direction * -1;
                //}
                //if(enemiesR1[i].alive){
                    enemiesR1[i].x = enemiesR1[i-1].x+54;
                    enemiesR1[i].y += (enemyHeight/2);
                    enemiesR1[i].direction = enemiesR1[i].direction * -1;
                //}
            }
        }
    }
    else if(dir == "r"){
        for(var i = 9; i >= 0; i--)
        {
            if(i == rightMostCol)
            {
                enemiesR3[i].x = canvas.width-enemyWidth-1;
                enemiesR2[i].x = canvas.width-enemyWidth-1;
                enemiesR1[i].x = canvas.width-enemyWidth-1;
                enemiesR3[i].direction = enemiesR3[i].direction * -1;
                enemiesR2[i].direction = enemiesR2[i].direction * -1;
                enemiesR1[i].direction = enemiesR1[i].direction * -1;
                enemiesR3[i].y += (enemyHeight/2);
                enemiesR2[i].y += (enemyHeight/2);
                enemiesR1[i].y += (enemyHeight/2);
            }
            else if(i < rightMostCol){
                //if(enemiesR3[i].alive){
                    enemiesR3[i].x = enemiesR3[i+1].x-54;
                    enemiesR3[i].y += (enemyHeight/2)
                    enemiesR3[i].direction = enemiesR3[i].direction * -1;
                //}
                //if(enemiesR2[i].alive){
                    enemiesR2[i].x = enemiesR2[i+1].x-54;
                    enemiesR2[i].y += (enemyHeight/2);
                    enemiesR2[i].direction = enemiesR2[i].direction * -1;
                //}
                //if(enemiesR1[i].alive){
                    enemiesR1[i].x = enemiesR1[i+1].x-54;
                    enemiesR1[i].y += (enemyHeight/2);
                    enemiesR1[i].direction = enemiesR1[i].direction * -1;
                //}
            }
        }
    }
}

//function to detect whether projectile has hit an enemy
function collisionDetection(enemies) {
    for(k = 0; k < enemies.length; k++)
    {
        var currEnemy = enemies[k];
        //if its a hit
        if(itsAHit(projectile, currEnemy))
        {
            //if correct weapon for enemy type and enemy is alive
            if(projectile.trashType == currEnemy.trashType && currEnemy.alive)
            {
                //set enemy to not alive, weapon_shoot to false, and projectile type to currWeapon
                currEnemy.alive = false;
                weapon_shoot = false;
                projectile.trashType = trash[currWeapon];

                //increase score and update scoreboard
                score += 10;
                scoreboard.textContent="Score: " + score;

                //update textBox
                textBox.textContent = "Nice Shot!";

                //setting projectile y to negative value to reset it
                //may be better way to do this
                projectile.y = -1000;

                //increase enemiesKilled and check if that was the last enemy
                enemiesKilled++;
                if(enemiesKilled >= enemies.length)
                {
                    //document.write("YOU WIN!");
                    respawnEnemies(enemies);
                    leftEnemy = enemy21;
                    rightEnemy = enemy30;
                    leftMostCol = 0;
                    rightMostCol = 9;
                    enemiesKilled = 0;

                    //COMMENTED OUT TO TEST ENEMY REGEN
                    /* if(user_id == null){
                        user_id = "Unknown Player"
                        document.write("\nName: " + "Unknown Player" + " Score: " +score);
                    }      
                    else{
                        document.write("\nName: " + user_id + " Score: " +score);
                    } */

                }
                else if(currEnemy == leftEnemy || currEnemy == rightEnemy) //else if we shot the leftmost or rightmost enemy, update
                {
                    updateEndEnemies(enemies, currEnemy);
                }
            }
            else if(projectile.trashType != currEnemy.trashType && currEnemy.alive)
            {
                textBox.textContent = "Looks like you're using the wrong weapon! That's a " + currEnemy.trashType + " enemy.";
            }
            
        }
    } 
}

//determines whether or not the projectile has hit a specific enemy
//returns true if hit, false if miss
function itsAHit(proj, currEnemy)
{
    //if the projectiles y coordinate is within the enemies current y range
    if(proj.y >= currEnemy.y && proj.y <= (currEnemy.y + currEnemy.height)){
        //if the projectiles x coordinate is within the enemies current x range
        if((proj.x+proj.width) >= currEnemy.x && proj.x <= (currEnemy.x+currEnemy.width)){
            //return true cuz its a hit
            return true;
        }
        else{
            //return false cuz not in x range
            return false;
        }
    }
    else{
        //return false cuz not in y range
        return false;
    }
}

//updates the weaponBox's class based on whether it is chosen or not
function updateWeaponBox(currWeap)
{
    if(currWeap == 0)
    {
        textileWeaponBox.className = "chosenWeapon";
        recyclingWeaponBox.className = "unchosenWeapon";
        compostWeaponBox.className = "unchosenWeapon";
    }
    else if(currWeap == 1)
    {
        recyclingWeaponBox.className = "chosenWeapon";
        textileWeaponBox.className = "unchosenWeapon";
        compostWeaponBox.className = "unchosenWeapon";
    }
    else if(currWeap == 2)
    {
        compostWeaponBox.className = "chosenWeapon";
        textileWeaponBox.className = "unchosenWeapon";
        recyclingWeaponBox.className = "unchosenWeapon";
    }
}

//generates the same enemy type for all enemies
function easyEnemyTypeGen(enemyArr)
{   //random # between 0-2 for enemy type
    var randNum = Math.floor(Math.random() * 3);

    //another random #between 0-2 for specific enemy type (for images)
    var randNum2 = Math.floor(Math.random() * 3);
    for(i = 0; i < enemyArr.length; i++)
    {
        enemyArr[i].trashType=trash[randNum];
        if(randNum == 0)
        {
            enemyArr[i].specTrashType = textileEnemies[randNum2];
        }
        else if(randNum == 1)
        {
            enemyArr[i].specTrashType = recyclingEnemies[randNum2];
        }
        else if(randNum == 2)
        {
            enemyArr[i].specTrashType = compostEnemies[randNum2];
        }
    }
    var randNums = [randNum, randNum2]
    return randNums;
}

//updates what the astronaut says based on enemy type
function astronautTalks(trashNums)
{
    if(trashNums[0] == 0)
    {
        if(trashNums[1] == 0){
            textBox.textContent = "Its a cluster of " + textileEnemies[trashNums[1]] + "! Use the Textile Teleporter to send them for textile recycling";
        }
        else{
            textBox.textContent = "Its a cluster of " + textileEnemies[trashNums[1]] + "! Use the Textile Teleporter to send them for thrifting at Thriftsburgh";
        }
    }
    else if(trashNums[0] == 1)
    {
        textBox.textContent = "Its a cluster of " + recyclingEnemies[trashNums[1]] + "! Use the Recycling Rocket to put them out for curbside recycling";
        //"Look at that cluster of beer cans! There must have been a banger last night! Use your recycling rocket to send those cans where they belong.";
    }
    else if(trashNums[0] == 2)
    {
        textBox.textContent = "Its a cluster of " + compostEnemies[trashNums[1]] + "! Use the Compost Cannon to send them to a composting bin";
        //textBox.textContent = "TEXT BOX";
    }
}

/* for when the player loses the game*/
function youLose()
{
    document.write("YOU LOST!<br>Score = " + score);
    scores.add({
        userID: user_id,
        score: score
    });
}

/* used to update the rightmost/leftmost enemies when they are shot 
    so that the enemy rows will know when the end enemy hits the canvas end*/
function updateEndEnemies(enemyArr ,currEnemy)
{
        //if we shot the leftmost or rightmost enemy, update
        if(currEnemy == leftEnemy)
        {
            while(leftMostCol < 10){
                if(enemiesR3[leftMostCol].alive)
                {
                    leftEnemy = enemiesR3[leftMostCol];
                    break;
                }
                else if(enemiesR2[leftMostCol].alive)
                {
                    leftEnemy = enemiesR2[leftMostCol];
                    break;
                }
                else if(enemiesR1[leftMostCol].alive)
                {
                    leftEnemy = enemiesR1[leftMostCol];
                    break;
                }
                leftMostCol++;
            }

            /* for(j = (k+1); j<enemyArr.length; j++)
            {
                if(enemyArr[j].alive)
                {
                    leftEnemy = enemyArr[j];
                    break;
                }
            } */
        }
        if(currEnemy == rightEnemy)
        {
            while(rightMostCol >= 0){
                if(enemiesR3[rightMostCol].alive)
                {
                    rightEnemy = enemiesR3[rightMostCol];
                    break;
                }
                else if(enemiesR2[rightMostCol].alive)
                {
                    rightEnemy = enemiesR2[rightMostCol];
                    break;
                }
                else if(enemiesR1[rightMostCol].alive)
                {
                    rightEnemy = enemiesR1[rightMostCol];
                    break;
                }
                rightMostCol--;
            }

            /* for(j = (enemyArr.length-1); j>=0; j--)
            {
                if(enemyArr[j].alive)
                {
                    rightEnemy = enemyArr[j];
                    break;
                }
            } */
        }
        console.log(leftEnemy);
        console.log(rightEnemy);
}

/* respawns enemies after current wave has all been killed. 
    basically it just resets their coordinates and alive boolean */
function respawnEnemies(enemyArr)
{
    enemyNums = easyEnemyTypeGen(enemyArr);
    astronautTalks(enemyNums);
    for(i = 0; i < enemies.length; i++)
    {
        enemies[i].alive = true;
        if(i<10)
        {
            enemyArr[i].y = 20;
        }
        else if(i>=10 && i <20)
        {
            enemyArr[i].y = 70;
        }
        else if(i>=20 && i < 30)
        {
            enemyArr[i].y = 120;
        }
        var iMod = i % 10;
        enemyArr[i].x = 42 + (54*iMod);  
        enemyArr[i].direction = -1; 
    }
}

/* respawns alive enemies after they hit the bottom */
    function respawnAliveEnemies(enemyArr)
    {
        HP--;
        if(HP <= 0){youLose();}
        else{
            HPBox.textContent = "HP = " + HP;
            for(i = 0; i < enemies.length; i++)
            {
                if(i<10)
                {
                    enemyArr[i].y = 20;
                }
                else if(i>=10 && i <20)
                {
                    enemyArr[i].y = 70;
                }
                else if(i>=20 && i < 30)
                {
                    enemyArr[i].y = 120;
                }
                var iMod = i % 10;
                enemyArr[i].x = 42 + (54*iMod);
                enemyArr[i].direction = -1;
                enemyArr[i].speedy = (enemyArr[i].speedy*2);
            }
        }
    }

var user_id = prompt("Please enter you name");
var player_x = canvas.width/2;
var player_y = 475;
var player1 = new Player(player_x, player_y, user_id);
var projectile = new Projectile(player_x,player_y-(projectileHeight/2));
var enemy1 = new Enemy(42,20);
var enemy2 = new Enemy(96,20);
var enemy3 = new Enemy(150,20);
var enemy4 = new Enemy(204,20);
var enemy5 = new Enemy(258,20);
var enemy6 = new Enemy(312,20);
var enemy7 = new Enemy(366,20);
var enemy8 = new Enemy(420,20);
var enemy9 = new Enemy(474,20);
var enemy10 = new Enemy(528,20);

var enemy11 = new Enemy(42,70);
var enemy12 = new Enemy(96,70);
var enemy13 = new Enemy(150,70);
var enemy14 = new Enemy(204,70);
var enemy15 = new Enemy(258,70);
var enemy16 = new Enemy(312,70);
var enemy17 = new Enemy(366,70);
var enemy18 = new Enemy(420,70);
var enemy19 = new Enemy(474,70);
var enemy20 = new Enemy(528,70);

var enemy21 = new Enemy(42,120);
var enemy22 = new Enemy(96,120);
var enemy23 = new Enemy(150,120);
var enemy24 = new Enemy(204,120);
var enemy25 = new Enemy(258,120);
var enemy26 = new Enemy(312,120);
var enemy27 = new Enemy(366,120);
var enemy28 = new Enemy(420,120);
var enemy29 = new Enemy(474,120);
var enemy30 = new Enemy(528,120);

var enemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10, enemy11, enemy12, enemy13, enemy14, enemy15, enemy16, enemy17, enemy18, enemy19, enemy20, enemy21, enemy22, enemy23, enemy24, enemy25, enemy26, enemy27, enemy28, enemy29, enemy30];
var enemiesR1 = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10];
var enemiesR2 = [enemy11, enemy12, enemy13, enemy14, enemy15, enemy16, enemy17, enemy18, enemy19, enemy20];
var enemiesR3 = [enemy21, enemy22, enemy23, enemy24, enemy25, enemy26, enemy27, enemy28, enemy29, enemy30];
/* enemyNums is an array of 2 numbers that is returned by Enemy Type Gen function where
    element 0 is the general enemy/weapon type and element 1 is the specific type for image*/
var enemyNums = easyEnemyTypeGen(enemies);
var textBox = document.getElementById("textBox");
astronautTalks(enemyNums);


//used to track the leftmost and rightmost enemies for when they hit the canvas ends
var leftEnemy = enemy21;
var rightEnemy = enemy30;
//initialize scoreboard
var scoreboard = document.getElementById("scoreboard");
scoreboard.textContent="Score: " + score;
//initialize weaponBox for displaying the current weapon
var textileWeaponBox = document.getElementById("textileWeaponBox");
textileWeaponBox.className = "chosenWeapon";
var recyclingWeaponBox = document.getElementById("recyclingWeaponBox");
recyclingWeaponBox.className = "unchosenWeapon";
var compostWeaponBox = document.getElementById("compostWeaponBox");
compostWeaponBox.className = "unchosenWeapon";

var HPBox = document.getElementById("hpBox");




function execution() {
    var canvas = document.getElementById("game_layer");
    var context = canvas.getContext("2d");
    context.fillStyle = "rgba(255, 255, 255, 0.5)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(gameRunning){
        player1.update();
        player1.draw();

        if(weapon_shoot){
            collisionDetection(enemies);
            projectile.update();
            projectile.draw();
        }

        if(enemyFiring)
        {
            enemy1.weapon.update();
            enemy1.weapon.draw();
        }
    
        /* for(i = 0; i < enemies.length; i++)
        {
            enemies[i].update();
            enemies[i].draw();
        } */

        enemy1.update();
        enemy1.draw();

        enemy2.update();
        enemy2.draw();
    
        enemy3.update();
        enemy3.draw();
    
        enemy4.update();
        enemy4.draw();
    
        enemy5.update();
        enemy5.draw();
    
        enemy6.update();
        enemy6.draw();
    
        enemy7.update();
        enemy7.draw();
    
        enemy8.update();
        enemy8.draw();
    
        enemy9.update();
        enemy9.draw();

        enemy10.update();
        enemy10.draw();

        enemy11.update();
        enemy11.draw();

        enemy12.update();
        enemy12.draw();
    
        enemy13.update();
        enemy13.draw();
    
        enemy14.update();
        enemy14.draw();
    
        enemy15.update();
        enemy15.draw();
    
        enemy16.update();
        enemy16.draw();
    
        enemy17.update();
        enemy17.draw();
    
        enemy18.update();
        enemy18.draw();

        enemy19.update();
        enemy19.draw();

        enemy20.update();
        enemy20.draw();

        enemy21.update();
        enemy21.draw();

        enemy22.update();
        enemy22.draw();
    
        enemy23.update();
        enemy23.draw();
    
        enemy24.update();
        enemy24.draw();
    
        enemy25.update();
        enemy25.draw();
    
        enemy26.update();
        enemy26.draw();
    
        enemy27.update();
        enemy27.draw();

        enemy28.update();
        enemy28.draw();
    
        enemy29.update();
        enemy29.draw();
    
        enemy30.update();
        enemy30.draw();
    }
    else{
        player1.draw();

        if(weapon_shoot){
            projectile.draw();
       }

        if(enemyFiring)
        {
            enemy1.weapon.draw();
        }

        enemy1.draw();
        enemy2.draw();
        enemy3.draw();
        enemy4.draw();
        enemy5.draw();
        enemy6.draw();
        enemy7.draw();
        enemy8.draw();
        enemy9.draw();
        enemy10.draw();
        enemy11.draw();
        enemy12.draw();
        enemy13.draw();
        enemy14.draw();
        enemy15.draw();
        enemy16.draw();
        enemy17.draw();
        enemy18.draw();
        enemy19.draw();
        enemy20.draw();
        enemy21.draw();
        enemy22.draw();
        enemy23.draw();
        enemy24.draw();
        enemy25.draw();
        enemy26.draw();
        enemy27.draw();
        enemy28.draw();
        enemy29.draw();
        enemy30.draw();
    }

    
    window.requestAnimationFrame(execution);

}

execution();
