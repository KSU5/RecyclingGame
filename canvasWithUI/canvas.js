
//event listeners for key presses
document.addEventListener("keydown",key_down_handler,false);
document.addEventListener("keyup",key_up_handler,false);
document.addEventListener("keypress",key_press_handler,false);

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

//all audio objects for different sounds/game music
var gameMusic = new Audio("all assets/sound effects/game sound.mp3");
gameMusic.loop = true;
var enemyKillSound = new Audio("all assets/sound effects/On_enemy_kill.wav");
var lossSound = new Audio("all assets/sound effects/On_loss.wav");
var wrongWeaponSound = new Audio("all assets/sound effects/On_mismatch.wav");
var playerHitSound = new Audio("all assets/sound effects/On_player_hurt.wav");
var shootSound = new Audio("all assets/sound effects/On_shoot.wav");

//enemy images
var socksPic = new Image();
socksPic.src = "all assets/normal/enemies/textenemy2.png";
var jeansPic = new Image();
jeansPic.src = "all assets/normal/enemies/textenemy1.png";
var shirtPic = new Image();
shirtPic.src = "all assets/normal/enemies/textenemy3.png";
var canPic = new Image();
canPic.src = "all assets/normal/enemies/recycenemy1.png";
var paperPic = new Image();
paperPic.src = "all assets/normal/enemies/recycenemy2.png";
var bottlePic = new Image();
bottlePic.src = "all assets/normal/enemies/recycenemy3.png";
var batteryPic = new Image();
batteryPic.src = "all assets/normal/enemies/recycenemy4.png";
var pizzaPic = new Image();
pizzaPic.src = "all assets/normal/enemies/compenemy1.png";
var applePic = new Image();
applePic.src = "all assets/normal/enemies/compenemy2.png";
var broccoliPic = new Image();
broccoliPic.src = "all assets/normal/enemies/compenemy3.png";
var strawsPic = new Image();
strawsPic.src = "all assets/normal/enemies/landfillenemy1.png";
var bagsPic = new Image();
bagsPic.src = "all assets/normal/enemies/landfillenemy2.png";
var cupsPic = new Image();
cupsPic.src = "all assets/normal/enemies/landfillenemy3.png";

//colorblind enemy images
var socksPicCB = new Image();
socksPicCB.src = "all assets/colorblind/enemies/textenemy2.png";
var jeansPicCB = new Image();
jeansPicCB.src = "all assets/colorblind/enemies/textenemy1.png";
var shirtPicCB = new Image();
shirtPicCB.src = "all assets/colorblind/enemies/textenemy3.png";
var canPicCB = new Image();
canPicCB.src = "all assets/colorblind/enemies/recycenemy1.png";
var paperPicCB = new Image();
paperPicCB.src = "all assets/colorblind/enemies/recycenemy2.png";
var bottlePicCB = new Image();
bottlePicCB.src = "all assets/colorblind/enemies/recycenemy3.png";
var batteryPicCB = new Image();
batteryPicCB.src = "all assets/colorblind/enemies/recycenemy4.png";
var pizzaPicCB = new Image();
pizzaPicCB.src = "all assets/colorblind/enemies/compenemy1.png";
var applePicCB = new Image();
applePicCB.src = "all assets/colorblind/enemies/compenemy2.png";
var broccoliPicCB = new Image();
broccoliPicCB.src = "all assets/colorblind/enemies/compenemy3.png";
var strawsPicCB = new Image();
strawsPicCB.src = "all assets/colorblind/enemies/landfillenemy1.png";
var bagsPicCB = new Image();
bagsPicCB.src = "all assets/colorblind/enemies/landfillenemy2.png";
var cupsPicCB = new Image();
cupsPicCB.src = "all assets/colorblind/enemies/landfillenemy3.png";

//enemy image arrays
var textileEnemiesPics = [socksPic, jeansPic, shirtPic];
var recyclingEnemiesPics = [canPic, paperPic, bottlePic, batteryPic];
var compostEnemiesPics = [pizzaPic, applePic, broccoliPic];
var landfillEnemiesPics = [strawsPic, bagsPic, cupsPic];

//colorblind enemy image arrays
var textileEnemiesPicsCB = [socksPicCB, jeansPicCB, shirtPicCB];
var recyclingEnemiesPicsCB = [canPicCB, paperPicCB, bottlePicCB, batteryPicCB];
var compostEnemiesPicsCB = [pizzaPicCB, applePicCB, broccoliPicCB];
var landfillEnemiesPicsCB  = [strawsPicCB, bagsPicCB, cupsPicCB];

var gameOverImg = new Image();
gameOverImg.src="all assets/normal/UI/menus/game over panel1.png";

var backBtn = new Image();
backBtn.src = "all assets/normal/UI/buttons/backbutton.png";

var FXSounds = [enemyKillSound, lossSound, wrongWeaponSound, playerHitSound, shootSound];

var FXVolLvl = 10;
var MusicVolLvl = 10;

//for colorblind mode
var colorblind = false;

var canvas = document.getElementById("game_layer");
var context = canvas.getContext("2d");

//trash and weaponNames indexes coordinate with eachother
var trash = ["textile", "recycling", "compost", "landfill"];
var weaponNames = ["Textile Teleporter", "Recycling Rocket", "Compost Cannon", "Landfill Laser"];

var player_x = canvas.width/2;
var player_y = 475;
var player1;
var projectile;

var enemy1;
var enemy2;
var enemy3;
var enemy4;
var enemy5;
var enemy6;
var enemy7;
var enemy8;
var enemy9;
var enemy10;

var enemy11;
var enemy12;
var enemy13;
var enemy14;
var enemy15;
var enemy16;
var enemy17;
var enemy18;
var enemy19;
var enemy20;

var enemy21;
var enemy22;
var enemy23;
var enemy24;
var enemy25;
var enemy26;
var enemy27;
var enemy28;
var enemy29;
var enemy30;

var lowestY;

var enemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10, enemy11, enemy12, enemy13, enemy14, enemy15, enemy16, enemy17, enemy18, enemy19, enemy20, enemy21, enemy22, enemy23, enemy24, enemy25, enemy26, enemy27, enemy28, enemy29, enemy30];
var enemiesR1 = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10];
var enemiesR2 = [enemy11, enemy12, enemy13, enemy14, enemy15, enemy16, enemy17, enemy18, enemy19, enemy20];
var enemiesR3 = [enemy21, enemy22, enemy23, enemy24, enemy25, enemy26, enemy27, enemy28, enemy29, enemy30];
/* enemyNums is an array of 2 numbers that is returned by Enemy Type Gen function where
    element 0 is the general enemy/weapon type and element 1 is the specific type for image*/
var enemyNums;
var enemyNums1;
var enemyNums2;
var enemyNums3;
var textBox = document.getElementById("textBox");
textBox.textContent = "Click Play button to play the game! Use the up/down arrows to toggle between weapons and the b key to fire at enemies!";

//used to track the leftmost and rightmost enemies for when they hit the canvas ends
var leftEnemy = enemy21;
var rightEnemy = enemy30;

//objects for updating scoreboard, weapon and HP boxes
var currWeapon = 0;
var scoreboard = document.getElementById("scoreboard");
var textileWeaponBox = document.getElementById("textileWeaponBox");
var recyclingWeaponBox = document.getElementById("recyclingWeaponBox");
var compostWeaponBox = document.getElementById("compostWeaponBox");
var landfillWeaponBox = document.getElementById("landfillWeaponBox");
var weaponNameBox = document.getElementById("weaponNameBox");
weaponNameBox.textContent = weaponNames[currWeapon];

var HPBox = document.getElementById("hpBox");

var interval;

var HSBox1 = document.getElementById("highscore1");
var HSBox2 = document.getElementById("highscore2");
var HSBox3 = document.getElementById("highscore3");
var HSBoxPlayer = document.getElementById("playerHighscore");

var gameOverScreen = false;

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

var user_id;
var score = 0;
var HP = 3;

//enemies arrays
var textileEnemies = ["socks", "jeans", "shirts"];
var recyclingEnemies = ["cans", "paper", "plastic bottles", "dead batteries"];
var compostEnemies = ["pizza", "apples", "broccoli"];
var landfillEnemies = ["straws", "plastic bags", "solo cups"];
var enemyTypes = [,textileEnemies, recyclingEnemies, compostEnemies, landfillEnemies];

//end of life arrays
var textileEnemiesEndOfLife = ["one of Pitt's textile recycling bins", "Thriftsburgh", "Thriftsburgh"];
var recyclingEnemiesEndOfLife = ["curbside recycling", "curbside recycling", "curbside recycling", "Pitt's on-campus battery recycling"];
var compostEnemiesEndOfLife = ["a composting bin", "a composting bin", "a composting bin"];
var landfillEnemiesEndOfLife = ["a trash can", "a trash can", "a trash can"];

var hitMessages = ["Nice shot! Press 'q' to pause the game if you need a break.", "Bullseye! Press 'q' to pause the game if you need a break."]

//gamePaused is for if the game is paused (by using the q key)
var gamePaused = true;
//gameRunning is for if the game is actually running, and not on some other menu screen
var gameRunning = false;

//to track the leftmost and rightmost columns, so wh know when end enemy hits side of canvas
var leftMostCol = 0;
var rightMostCol = 9;




var DB = firebase.database();

function writeUserData(userId, TS) {
    //firebase.database()
    DB.ref('users/' + userId).set(TS);

    var scoreString = TS + "_" + userId;

    /* DB.ref('scores/' + scoreString).set({
        username: userId,
        topscore: TS
      }); */
  }

/************************************Database Functions************************************/
var top3;
var userHigh;

var sortedScores = [];
var sortedNames = [];

var top3Low;

function getTop3(){
    var top3Promise = DB.ref('users').orderByValue().limitToLast(3).once('value').then((snapshot) => {;
    top3 = snapshot.val();
    sortTop3();
    hideMenuTable();
    fillHighScores();
    showScoreboardTable();
    //console.log(snapshot.val());
    //console.log(Object.keys(top3));
    //console.log(top3);
});

}

function sortTop3(){
    var TSArr = Object.values(top3);
    var TSNames = Object.keys(top3);

    for(var ll = 0; ll < 3; ll++){
        var maxScore = Math.max.apply(Math, TSArr);
        var maxScoreIndex = TSArr.indexOf(maxScore);
        var maxScoreName = TSNames[maxScoreIndex];
        sortedScores.push(TSArr.splice(maxScoreIndex, 1));
        sortedNames.push(TSNames.splice(maxScoreIndex, 1));
    }

    top3Low = sortedScores[2];
}

function adjustTop3(userId, newTS){

    var ind;
    if(sortedNames[0].toString() == userId){
        ind = 0;
    }
    else if(sortedNames[1].toString() == userId){
        ind = 1;
    }
    else if(sortedNames[2].toString() == userId){
        ind = 2;
    }
    else{
        ind = -1;
    }
    //console.log(ind);
    
    //if users top score in top scores
    if(ind>=0){
        //if its the first then just replace score
        if(ind == 0){
            sortedScores[0] = newTS;
        }
        else if(ind == 1){
            if(newTS > sortedScores[1]){
                if(newTS >= sortedScores[0]){
                    var tempName = sortedNames[0];
                    var tempScore = sortedScores[0];
                    sortedNames[0] = user_id;
                    sortedScores[0] = newTS;
                    sortedNames[1] = tempName;
                    sortedScores[1] = tempScore;
                }
                else{
                    sortedScores[1] = newTS;
                }
            }
        }
        else if(ind == 2){
            if(newTS > sortedScores[0]){
                sortedScores[2] = sortedScores[1];
                sortedNames[2] = sortedNames[1];
                sortedScores[1] = sortedScores[0];
                sortedNames[1] = sortedNames[0];
                sortedScores[0] = newTS;
                sortedNames[0] = userId;

            }
            else if(newTS > sortedScores[1]){
                sortedScores[2] = sortedScores[1];
                sortedNames[2] = sortedNames[1];
                sortedScores[1] = newTS;
                sortedNames[1] = userId;
            }
            else{
                sortedScores[2] = newTS;
            }
        }
    }
    else{
        if(newTS > sortedScores[0]){
            sortedScores[2] = sortedScores[1];
            sortedNames[2] = sortedNames[1];

            sortedScores[1] = sortedScores[0];
            sortedNames[1] = sortedNames[0];

            sortedScores[0] = newTS;
            sortedNames[0] = userId;
        }
        else if(newTS > sortedScores[1]){
            sortedScores[2] = sortedScores[1];
            sortedNames[2] = sortedNames[1];

            sortedScores[1] = newTS;
            sortedNames[1] = userId;
        }
        else if(newTS > sortedScores[2]){
            sortedScores[2] = newTS;
            sortedNames[2] = userId;
        }
    }
    top3Low = sortedScores[2];
}

//getTop3();

function getTS(userId){
    firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
        userHigh = snapshot.val() || 0;
        //console.log(userHigh);
      });
}
/************************************End Database Functions************************************/

function key_down_handler(event){
    if(gameRunning){
        if(event.keyCode == 39){
            move_right = true;
        }
        else if(event.keyCode == 37){
            move_left = true;
        }
    }

}

function key_up_handler(event){
    if(gameRunning){
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
                    addProjectileImage(projectile);
                    updateWeaponBox(currWeapon);
                }
                else
                {
                    currWeapon++;
                    projectile.trashType = trash[currWeapon];
                    addProjectileImage(projectile);
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
                    addProjectileImage(projectile);
                    updateWeaponBox(currWeapon);
                }
                else
                {
                    currWeapon--;
                    projectile.trashType = trash[currWeapon];
                    addProjectileImage(projectile);
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
            if(!gamePaused)
            {
                textBox.textContent = "Press the q key to resume the game!";
                gameMusic.pause();
                gamePaused = true;
            }
            else
            {
                astronautTalks(enemyNums);
                gameMusic.play();
                gamePaused = false;
            }
        }
        else if(event.keyCode == 66){
            //if projectile isnt on screen then we set its x coordinate to be the middle of the ship

            //if game isnt paused
            if(!gamePaused && !weapon_shoot){
                projectile.x = player_x + (playerWidth/2) - (projectile.width/2);
                shootSound.play();
                weapon_shoot = true;
            }
        }
        else if(event.keyCode == 17){
            event.preventDefault();
        }
    }

}

function key_press_handler(event){
    if(gameRunning){
        if(event.keyCode == 38){
        weapon_up = true;
        }   
        else if(event.keyCode == 40){
        weapon_down = true;
        }
        
    }
}

/***********************************"Object" Functions*******************************/

function Projectile(x, y){
    this.x = x;
    this.y = y;
    this.width = projectileWidth;
    this.height = projectileHeight;
    this.speedy = 6;
    this.trashType = trash[currWeapon];
    this.img = new Image(this.x, this.y);
}

Projectile.prototype.draw = function(enemyShootin){

    context.drawImage(this.img, this.x, this.y);

    //if the projectile is an enemies projectile and reached the bottom of the game, then reset
    if(this.y >= canvas.height && this.trashType == "enemy")
    {
        
        enemyFiring = false;
        enemyShootin.firing = false;
        enemyShootin.weapon.y = enemyShootin.y + (enemyHeight/2);
            
    }
    //else if the players projectile reaches the top of the game, set weapon_shoot to false, reset projectile y val and change projectile type to currWeapon
    else if(this.y <= 0 && this == projectile)
    {
        weapon_shoot = false;
        this.y = player_y - (projectileHeight/2);
        projectile.trashType = trash[currWeapon];
        addProjectileImage(projectile);
    }

}
Projectile.prototype.update = function(){
    if(this.trashType == "enemy" && enemyFiring)
    {
        this.y += this.speedy;
    }
    else if(weapon_shoot && this == projectile){
        projectile.y -= projectile.speedy;
    }
}

function Player(x, y, user_id){
    this.id = user_id;
    this.x = x;
    this.y = y;
    this.width = playerWidth;
    this.height = playerHeight;
    this.speedx = 2.0;
    this.hp = 3;
    this.img = new Image();
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
    this.firing = false;
    this.trashType;
    this.specTrashType;
    this.weapon = new Projectile(this.x, this.y);
    this.weapon.trashType = "enemy";
    this.weapon.speedy = 4.5;
    this.img = new Image();
}

Enemy.prototype.draw = function()
{
    //for drawing enemy projectile when game is paused
    if(this.alive && this.firing && gamePaused)
    {
        this.weapon.draw(this);
    }

    if(this.alive)
    {
        if(this.y + enemyHeight >= lowestY){
            lowestY = this.y + enemyHeight;
        }
        context.drawImage(this.img, this.x, this.y);
    }
    
};

//updates enemys coordinates
Enemy.prototype.update = function(){

    this.x = this.x + this.direction * this.speedy;
    
    if(enemyFiring && this.firing)
    {
        PlayerCollisionDetection(this);
        this.weapon.update();
        this.weapon.draw(this);
    }

    if (leftEnemy.x <= 0){
        enemiesDrop("l");
    }
    else if(rightEnemy.x + this.width >= canvas.width)
    {
        enemiesDrop("r");
    }
    
    //if the 1st or Last enemy hits the canvas end, drop and switch directions
    if(this.y >= player_y - (playerHeight/2) && this.alive)
    {
        respawnAliveEnemies(enemies);
    }
    
}

//to drop and align enemies when they hit either side of the canvas
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
                    enemiesR3[i].x = enemiesR3[i-1].x+54;
                    enemiesR3[i].y += (enemyHeight/2);
                    enemiesR3[i].direction = enemiesR3[i].direction * -1;
                    enemiesR2[i].x = enemiesR2[i-1].x+54;
                    enemiesR2[i].y += (enemyHeight/2);
                    enemiesR2[i].direction = enemiesR2[i].direction * -1;
                    enemiesR1[i].x = enemiesR1[i-1].x+54;
                    enemiesR1[i].y += (enemyHeight/2);
                    enemiesR1[i].direction = enemiesR1[i].direction * -1;
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
                    enemiesR3[i].x = enemiesR3[i+1].x-54;
                    enemiesR3[i].y += (enemyHeight/2);
                    enemiesR3[i].direction = enemiesR3[i].direction * -1;
                    enemiesR2[i].x = enemiesR2[i+1].x-54;
                    enemiesR2[i].y += (enemyHeight/2);
                    enemiesR2[i].direction = enemiesR2[i].direction * -1;
                    enemiesR1[i].x = enemiesR1[i+1].x-54;
                    enemiesR1[i].y += (enemyHeight/2);
                    enemiesR1[i].direction = enemiesR1[i].direction * -1;
            }
        }
    }
}

//adds enemy image to a single enemy based on what type it is
//also adds enemys projectile image
function addEnemyImage(currEn)
{
    if(!colorblind){
        if(currEn.specTrashType == textileEnemies[0]){currEn.img=textileEnemiesPics[0];}
        else if(currEn.specTrashType == textileEnemies[1]){currEn.img=textileEnemiesPics[1];}
        else if(currEn.specTrashType == textileEnemies[2]){currEn.img=textileEnemiesPics[2];}
        else if(currEn.specTrashType == recyclingEnemies[0]){currEn.img=recyclingEnemiesPics[0];}
        else if(currEn.specTrashType == recyclingEnemies[1]){currEn.img=recyclingEnemiesPics[1];}
        else if(currEn.specTrashType == recyclingEnemies[2]){currEn.img=recyclingEnemiesPics[2];}
        else if(currEn.specTrashType == recyclingEnemies[3]){currEn.img=recyclingEnemiesPics[3];}
        else if(currEn.specTrashType == compostEnemies[0]){currEn.img=compostEnemiesPics[0];}
        else if(currEn.specTrashType == compostEnemies[1]){currEn.img=compostEnemiesPics[1];}
        else if(currEn.specTrashType == compostEnemies[2]){currEn.img=compostEnemiesPics[2];}
        else if(currEn.specTrashType == landfillEnemies[0]){currEn.img=landfillEnemiesPics[0];}
        else if(currEn.specTrashType == landfillEnemies[1]){currEn.img=landfillEnemiesPics[1];}
        else if(currEn.specTrashType == landfillEnemies[2]){currEn.img=landfillEnemiesPics[2];}
        currEn.weapon.img.src = "all assets/normal/bullets/enemyprojectile1.png";
    }
    else{
        if(currEn.specTrashType == textileEnemies[0]){currEn.img=textileEnemiesPicsCB[0];}
        else if(currEn.specTrashType == textileEnemies[1]){currEn.img=textileEnemiesPicsCB[1];}
        else if(currEn.specTrashType == textileEnemies[2]){currEn.img=textileEnemiesPicsCB[2];}
        else if(currEn.specTrashType == recyclingEnemies[0]){currEn.img=recyclingEnemiesPicsCB[0];}
        else if(currEn.specTrashType == recyclingEnemies[1]){currEn.img=recyclingEnemiesPicsCB[1];}
        else if(currEn.specTrashType == recyclingEnemies[2]){currEn.img=recyclingEnemiesPicsCB[2];}
        else if(currEn.specTrashType == recyclingEnemies[3]){currEn.img=recyclingEnemiesPicsCB[3];}
        else if(currEn.specTrashType == compostEnemies[0]){currEn.img=compostEnemiesPicsCB[0];}
        else if(currEn.specTrashType == compostEnemies[1]){currEn.img=compostEnemiesPicsCB[1];}
        else if(currEn.specTrashType == compostEnemies[2]){currEn.img=compostEnemiesPicsCB[2];}
        else if(currEn.specTrashType == landfillEnemies[0]){currEn.img=landfillEnemiesPicsCB[0];}
        else if(currEn.specTrashType == landfillEnemies[1]){currEn.img=landfillEnemiesPicsCB[1];}
        else if(currEn.specTrashType == landfillEnemies[2]){currEn.img=landfillEnemiesPicsCB[2];}
        currEn.weapon.img.src = "all assets/colorblind/bullets/enemyprojectile1.png";
    }
}

//adds image of currWeapon to the players projectile
function addProjectileImage(playerProjectile){
    if(!colorblind){    
        if(playerProjectile.trashType == trash[0]){
            playerProjectile.img.src = "all assets/normal/bullets/textile bullet.png";
        }
        else if(playerProjectile.trashType == trash[1]){
            playerProjectile.img.src = "all assets/normal/bullets/recycle bullet.png";
        }
        else if(playerProjectile.trashType == trash[2]){
            playerProjectile.img.src = "all assets/normal/bullets/compost bullet.png";
        }
        else if(playerProjectile.trashType == trash[3])
        {
            playerProjectile.img.src = "all assets/normal/bullets/landfill bullet.png";
        }
    }
    else{
        if(playerProjectile.trashType == trash[0]){
            playerProjectile.img.src = "all assets/colorblind/bullets/textile bullet.png";
        }
        else if(playerProjectile.trashType == trash[1]){
            playerProjectile.img.src = "all assets/colorblind/bullets/recycle bullet.png";
        }
        else if(playerProjectile.trashType == trash[2]){
            playerProjectile.img.src = "all assets/colorblind/bullets/compost bullet.png";
        }
        else if(playerProjectile.trashType == trash[3])
        {
            playerProjectile.img.src = "all assets/colorblind/bullets/landfill bullet.png";
        }
    }
}

//adds spaceship image to Player
function addShipImage(playerObj){
    if(colorblind){
        playerObj.img.src = "all assets/colorblind/ship/spaceship.png";
    }
    else{
        playerObj.img.src = "all assets/normal/ship/spaceship.png";
    }
}

/*********************************End "Object" Functions*****************************/

//function to detect whether player was hit by an enemy projectile, and make adjustments to game accodingly
function PlayerCollisionDetection(enemyShooting) {
    if(enemyShooting.weapon.y >= player1.y - (playerHeight/2)){
        if((enemyShooting.weapon.x+projectileWidth) >= player1.x && enemyShooting.weapon.x <= (player1.x+playerWidth)) {
            playerHitSound.play();

            enemyFiring = false;
            enemyShooting.firing = false;
            HP--;
            if(HP <= 0){youLose();}
            else{
                HPBox.textContent = "HP = " + HP;
                textBox.textContent = "We've been hit! Press 'q' to pause the game, press 'b' to fire your weapon and use the up/down arrows to change weapons!";
            }
        }
    }
}


//function to make an enemy shoot
function enemyShoot()
{
    if(!enemyFiring && !gamePaused){   
        //random # between 0-9 for enemy to fire
        var rando = Math.floor(Math.random() * 10);
        while(!enemiesR3[rando].alive && !enemiesR2[rando].alive && !enemiesR1[rando].alive){
            rando = Math.floor(Math.random() * 10);
        }
        if(enemiesR3[rando].alive){
            enemiesR3[rando].firing = true;
            enemyFiring = true;
            enemiesR3[rando].weapon.x = enemiesR3[rando].x + (enemyWidth/2) - (projectileWidth/2);
            enemiesR3[rando].weapon.y = enemiesR3[rando].y + (enemyHeight/2);
        }
        else if(enemiesR2[rando].alive){
            enemiesR2[rando].firing = true;
            enemyFiring = true;
            enemiesR2[rando].weapon.x = enemiesR2[rando].x + (enemyWidth/2) - (projectileWidth/2);
            enemiesR2[rando].weapon.y = enemiesR2[rando].y + (enemyHeight/2);
        }
        else if(enemiesR1[rando].alive){
            enemiesR1[rando].firing = true;
            enemyFiring = true;
            enemiesR1[rando].weapon.x = enemiesR1[rando].x + (enemyWidth/2) - (projectileWidth/2);
            enemiesR1[rando].weapon.y = enemiesR1[rando].y + (enemyHeight/2);
        }
        shootSound.play();
    }
}

//function to detect whether projectile has hit an enemy, and make adjustments to game accordingly
function enemyCollisionDetection(enemies) {
    for(k = 0; k < enemies.length; k++)
    {
        var currEnemy = enemies[k];
        //if its a hit
        if(itsAHit(projectile, currEnemy))
        {
            //if correct weapon for enemy type and enemy is alive
            if(projectile.trashType == currEnemy.trashType && currEnemy.alive)
            {
                enemyKillSound.play();
                //set enemy to not alive, weapon_shoot to false, and projectile type to currWeapon
                currEnemy.alive = false;
                weapon_shoot = false;
                projectile.trashType = trash[currWeapon];
                addProjectileImage(projectile);

                //increase score and update scoreboard
                score += 10;
                scoreboard.textContent="Score: " + score;

                //update textBox
                var msgNum = Math.floor(Math.random() * 2);
                textBox.textContent = hitMessages[msgNum];

                //setting projectile y to negative value to reset it
                //may be better way to do this
                projectile.y = -1000;

                //increase enemiesKilled and check if that was the last enemy
                enemiesKilled++;
                if(enemiesKilled >= enemies.length)
                {
                    respawnEnemies(enemies, true);
                    enemyNums = [];
                    enemyNums1 = enemyRowGen(enemiesR1);
                    enemyNums = enemyNums.concat(enemyNums1);
                    enemyNums2 = enemyRowGen(enemiesR2);
                    enemyNums = enemyNums.concat(enemyNums2);
                    enemyNums3 = enemyRowGen(enemiesR3);
                    enemyNums = enemyNums.concat(enemyNums3);
                    astronautTalks(enemyNums);
                    lowestY = enemy21.y + enemyHeight;
                    leftEnemy = enemy21;
                    rightEnemy = enemy30;
                    leftMostCol = 0;
                    rightMostCol = 9;
                    enemiesKilled = 0;

                }
                else if(currEnemy == leftEnemy || currEnemy == rightEnemy) //else if we shot the leftmost or rightmost enemy, update
                {
                    updateEndEnemies(enemies, currEnemy);
                }
            }
            else if(projectile.trashType != currEnemy.trashType && currEnemy.alive)
            {
                wrongWeaponSound.play();
                weapon_shoot = false;
                projectile.trashType = trash[currWeapon];
                addProjectileImage(projectile);
                //setting projectile y to negative value to reset it
                //may be better way to do this
                projectile.y = -1000;
                wrongHitMsg(currEnemy);
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

//to display educational message when user hits an enemy with wrong projectile type
function wrongHitMsg(hitEnemy)
{
    if(hitEnemy.trashType == trash[0]){ //if textile
       var textileString = "You're using the wrong weapon! Only 15% of used clothing in the USA is recycled, leaving landfills full of clothes that could've been recycled! Use the up/down keys to switch to the correct weapon.";
       textBox.textContent = textileString;
    }
    else if(hitEnemy.trashType == trash[1]){ //else if recyclable
        textBox.textContent = "You're using the wrong weapon! Improperly recycling prevents resources from being reused which hurts the enviroment! Use the up/down keys to switch to the correct weapon.";
    }
    else if(hitEnemy.trashType == trash[2]){ //else if compose
        textBox.textContent = "You're using the wrong weapon! Not composting leads to increased waste in landfills! Use the up/down keys to switch to the correct weapon.";
    }
    else if(hitEnemy.trashType == trash[3]){ //else if landfill
        textBox.textContent = "You're using the wrong weapon! Trash can contaminate other items being recycled or composted which compromises our sustainability mission! Use the up/down keys to switch to the correct weapon.";
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
        landfillWeaponBox.className = "unchosenWeapon";
    }
    else if(currWeap == 1)
    {
        recyclingWeaponBox.className = "chosenWeapon";
        textileWeaponBox.className = "unchosenWeapon";
        compostWeaponBox.className = "unchosenWeapon";
        landfillWeaponBox.className = "unchosenWeapon";
    }
    else if(currWeap == 2)
    {
        compostWeaponBox.className = "chosenWeapon";
        textileWeaponBox.className = "unchosenWeapon";
        recyclingWeaponBox.className = "unchosenWeapon";
        landfillWeaponBox.className = "unchosenWeapon";
    }
    else if(currWeapon == 3)
    {
        landfillWeaponBox.className = "chosenWeapon";
        textileWeaponBox.className = "unchosenWeapon";
        recyclingWeaponBox.className = "unchosenWeapon";
        compostWeaponBox.className = "unchosenWeapon";
    }
    weaponNameBox.textContent = weaponNames[currWeapon];
}

//generates a type of enemy for the given row and assigns
function enemyRowGen(enemyRow)
{
    //random # between 0-3 for enemy type
    var randNumo = Math.floor(Math.random() * 4);
    var randNumo2;

    //if randNum = 1 then its recycling so we need a randNum2 between 0-3
    if(randNumo == 1){
        randNumo2 = Math.floor(Math.random() * recyclingEnemies.length);
    }
    else if (randNumo == 0){ //else randNum2 between 0-2
        randNumo2 = Math.floor(Math.random() * textileEnemies.length);
    }
    else if(randNumo == 2){
        randNumo2 = Math.floor(Math.random() * compostEnemies.length);
    }
    else if(randNumo == 3){
        randNumo2 = Math.floor(Math.random() * landfillEnemies.length);
    }
    console.log(enemyTypes[1].length);

    if(enemyNums.length >= 2)
    {
        while(randNumo == enemyNums[0] && randNumo2 == enemyNums[1])
        {
            randNumo = Math.floor(Math.random() * 4);
            //if randNum = 1 then its recycling so we need a randNum2 between 0-3
            if(randNumo == 1){
                randNumo2 = Math.floor(Math.random() * recyclingEnemies.length);
            }
            else if (randNumo == 0){ //else randNum2 between 0-2
                randNumo2 = Math.floor(Math.random() * textileEnemies.length);
            }
            else if(randNumo == 2){
                randNumo2 = Math.floor(Math.random() * compostEnemies.length);
            }
            else if(randNumo == 3){
                randNumo2 = Math.floor(Math.random() * landfillEnemies.length);
            }
        }
    }
    if(enemyNums.length >= 4)
    {
        while(randNumo == enemyNums[2] && randNumo2 == enemyNums[3])
        {
            randNumo = Math.floor(Math.random() * 4);
             //if randNum = 1 then its recycling so we need a randNum2 between 0-3
             if(randNumo == 1){
                randNumo2 = Math.floor(Math.random() * recyclingEnemies.length);
            }
            else if (randNumo == 0){ //else randNum2 between 0-2
                randNumo2 = Math.floor(Math.random() * textileEnemies.length);
            }
            else if(randNumo == 2){
                randNumo2 = Math.floor(Math.random() * compostEnemies.length);
            }
            else if(randNumo == 3){
                randNumo2 = Math.floor(Math.random() * landfillEnemies.length);
            }
        }
    }

    for(var i = 0; i < enemyRow.length; i++)
    {
        enemyRow[i].trashType = trash[randNumo]
        if(randNumo == 0)
        {
            enemyRow[i].specTrashType = textileEnemies[randNumo2];
        }
        else if(randNumo == 1)
        {
            enemyRow[i].specTrashType = recyclingEnemies[randNumo2];
        }
        else if(randNumo == 2)
        {
            enemyRow[i].specTrashType = compostEnemies[randNumo2];
        }
        else if(randNumo == 3)
        {
            enemyRow[i].specTrashType = landfillEnemies[randNumo2];
        }
        addEnemyImage(enemyRow[i]);
    }
    var randNumos = [randNumo, randNumo2]
    return randNumos;
}

//updates what the astronaut says based on enemy type
function astronautTalks(trashNumxs)
{
    var fullString = "Its a cluster of ";
    var endPlacesArr = [];
    
    for(var x = 0; x < trashNumxs.length; x+=2){
        //variable to hold the where the item is supposed to be disposed of
        var endOfLife;
        //if the row of enemies trashNumber is 0 then it is a textile enemy
        if(trashNumxs[x] == 0)
        {
            endOfLife = textileEnemiesEndOfLife[trashNumxs[x+1]];

            /* this checks for whether the end of life option is the same as another enemies 
                so that it isnt repeated in the sentence, doesnt need to be changed */
            if(!endPlacesArr.includes(endOfLife))
            {
                endPlacesArr.push(endOfLife);
            }

            //this adds a comma or & to complete the sentence, doesnt need to be changed
            if(x != 4){
                var enemy = textileEnemies[trashNumxs[x+1]];
                fullString = fullString.concat(enemy + ", ");
            }
            else{
                var enemy = textileEnemies[trashNumxs[x+1]];
                fullString = fullString.concat(" & " + enemy);
            }
        }
        else if(trashNumxs[x] == 1) //else if the trashNumber is 1, then it is a recycling enemy
        {
            endOfLife = recyclingEnemiesEndOfLife[trashNumxs[x+1]];

            /* this checks for whether the end of life option is the same as another enemies 
                so that it isnt repeated in the sentence, doesnt need to be changed */
            if(!endPlacesArr.includes(endOfLife))
            {
                endPlacesArr.push(endOfLife);
            }

            //this just adds a comma or & to complete the sentence, doesnt need to be changed
            if(x != 4){
                fullString = fullString.concat(recyclingEnemies[trashNumxs[x+1]] + ", ");
            }
            else{
                fullString = fullString.concat(" & " + recyclingEnemies[trashNumxs[x+1]]);
            }
        }
        else if(trashNumxs[x] == 2) //is if trashNum is 2, then it is a composting enemy
        {
            endOfLife = compostEnemiesEndOfLife[trashNumxs[x+1]];

            /* this checks for whether the end of life option is the same as another enemies 
                so that it isnt repeated in the sentence, doesnt need to be changed */
            if(!endPlacesArr.includes(endOfLife))
            {
                endPlacesArr.push(endOfLife);
            }

            //this just adds a comma or & to complete the sentence, doesnt need to be changed
            if(x != 4){
                fullString = fullString.concat(compostEnemies[trashNumxs[x+1]] + ", ");
            }
            else{
                fullString = fullString.concat(" & " + compostEnemies[trashNumxs[x+1]]);
            }
        }
        else if(trashNumxs[x] == 3) //else if trashNums is 3 then it is a landfill enemy
        {
            endOfLife = landfillEnemiesEndOfLife[trashNumxs[x+1]];

            /* this checks for whether the end of life option is the same as another enemies 
                so that it isnt repeated in the sentence, doesnt need to be changed */
            if(!endPlacesArr.includes(endOfLife))
            {
                endPlacesArr.push(endOfLife);
            }

            //this just adds a comma or & to complete the sentence, doesnt need to be changed
            if(x != 4){
                fullString = fullString.concat(landfillEnemies[trashNumxs[x+1]] + ", ");
            }
            else{
                fullString = fullString.concat(" & " + landfillEnemies[trashNumxs[x+1]]);
            }
        }
    }
    fullString = fullString.concat("! Use press 'b' to fire and send them to ");
    
    if(endPlacesArr.length == 1)
    {
        fullString = fullString.concat(endPlacesArr[0]);
    }
    else if(endPlacesArr.length == 2)
    {
        fullString = fullString.concat(endPlacesArr[0] + " and " + endPlacesArr[1]);
    }
    else if(endPlacesArr.length == 3)
    {
        fullString = fullString.concat(endPlacesArr[0] + ", " + endPlacesArr[1] + " and " + endPlacesArr[2]);
    }

    textBox.textContent = fullString;

}

/* for when the player loses the game*/
function youLose()
{
    HPBox.textContent = "HP = " + HP;
    gameMusic.pause();
    gameMusic.currentTime = 0;
    lossSound.play();
if(user_id != ""){
    
    if(score > userHigh){
        userHigh = score;
        writeUserData(user_id, score);

        if(score > top3Low){
            console.log("Good Job!");
            adjustTop3(user_id, score);
        }
    }

}

    endGame();
}

function endGame(){
    gameRunning = false;
    gamePaused = true;
    gameOverScreen = true;
    execution(gameRunning)
    window.cancelAnimationFrame(execution);
    textBox.textContent = "Good Game! Visit Pitt Sustainability's website to learn more about how and where to properly dispose of your trash.";
    clearInterval(interval);
}

/* used to update the rightmost/leftmost enemies when they are shot 
    so that the enemy rows will know when the end enemy hits the canvas end*/
function updateEndEnemies(enemyArr, currEnemy)
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
        }
}

//creates new enemies for game start
function createEnemies(){
    enemy1 = new Enemy(42,20);
    enemy2 = new Enemy(96,20);
    enemy3 = new Enemy(150,20);
    enemy4 = new Enemy(204,20);
    enemy5 = new Enemy(258,20);
    enemy6 = new Enemy(312,20);
    enemy7 = new Enemy(366,20);
    enemy8 = new Enemy(420,20);
    enemy9 = new Enemy(474,20);
    enemy10 = new Enemy(528,20);

    enemy11 = new Enemy(42,70);
    enemy12 = new Enemy(96,70);
    enemy13 = new Enemy(150,70);
    enemy14 = new Enemy(204,70);
    enemy15 = new Enemy(258,70);
    enemy16 = new Enemy(312,70);
    enemy17 = new Enemy(366,70);
    enemy18 = new Enemy(420,70);
    enemy19 = new Enemy(474,70);
    enemy20 = new Enemy(528,70);

    enemy21 = new Enemy(42,120);
    enemy22 = new Enemy(96,120);
    enemy23 = new Enemy(150,120);
    enemy24 = new Enemy(204,120);
    enemy25 = new Enemy(258,120);
    enemy26 = new Enemy(312,120);
    enemy27 = new Enemy(366,120);
    enemy28 = new Enemy(420,120);
    enemy29 = new Enemy(474,120);
    enemy30 = new Enemy(528,120);

    lowestY = enemy21.y + enemyHeight;
}

function createPlayer(){
    player_x = canvas.width/2;
    player_y = 475;
    player1 = new Player(player_x, player_y, user_id);
    projectile = new Projectile(player_x,player_y-(projectileHeight/2));
}

/* respawns enemies after current wave has all been killed. 
    basically it just resets their coordinates and alive boolean */
function respawnEnemies(enemyArr, pFlag)
{
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
        if(pFlag && score < 400){
            enemyArr[i].speedy = (enemyArr[i].speedy+0.1);
        }
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
            enemyArr[i].speedy = (enemyArr[i].speedy+0.1);
        }
    }
}

function getPittID(){
    user_id = document.getElementById("IDBox").value;
    //console.log("Hi");
    //console.log(user_id);
    if(user_id == null){
        document.getElementById("badNameTD").style.visibility = "visible";
    }
    else{
        if(user_id == ""){
            document.getElementById("badNameTD").style.visibility = "hidden";
            hideIDPrompt();
            showMenuTable();
        }
        else{
            var match = user_id.match(/^[a-zA-Z]{3}\d{1,3}$/);
            //console.log(match[0]);
            if(match == null){
                document.getElementById("badNameTD").style.visibility = "visible";
            }
            else{
                document.getElementById("badNameTD").style.visibility = "hidden";
                user_id = user_id.toUpperCase();
                getTS(user_id);
                hideIDPrompt();
                showMenuTable();
            }
        }
    }
}


function setupNewGame(){
    
    createPlayer();
    createEnemies();

    lowestY = enemy21.y + enemyHeight;

    enemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10, enemy11, enemy12, enemy13, enemy14, enemy15, enemy16, enemy17, enemy18, enemy19, enemy20, enemy21, enemy22, enemy23, enemy24, enemy25, enemy26, enemy27, enemy28, enemy29, enemy30];
    enemiesR1 = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10];
    enemiesR2 = [enemy11, enemy12, enemy13, enemy14, enemy15, enemy16, enemy17, enemy18, enemy19, enemy20];
    enemiesR3 = [enemy21, enemy22, enemy23, enemy24, enemy25, enemy26, enemy27, enemy28, enemy29, enemy30];

    //clear enemyNums array and generate different enemy types for each row
    enemyNums = [];
    enemyNums1 = enemyRowGen(enemiesR1);
    enemyNums = enemyNums.concat(enemyNums1);
    enemyNums2 = enemyRowGen(enemiesR2);
    enemyNums = enemyNums.concat(enemyNums2);
    enemyNums3 = enemyRowGen(enemiesR3);
    enemyNums = enemyNums.concat(enemyNums3);
    //update textbox to reflect new enemy types
    astronautTalks(enemyNums);
    //add interval that makes an enemy shoot every 3 seconds
    interval = setInterval(enemyShoot, 3000);

    //reset all vars and enemies speeds
    move_left = false;
    move_right = false;
    weapon_up = false;
    weapon_down = false;
    weapon_shoot = false;
    enemiesKilled = 0;
    enemyFiring = false;

    //still reseting vars, updating weaponBox and projectile type/image
    currWeapon = 0;
    updateWeaponBox(currWeapon);
    projectile.trashType = trash[currWeapon];
    addProjectileImage(projectile);
    addShipImage(player1);

    //reset score, HP, left/rightmost enemies and lowestY value
    score = 0;
    HP = 3;
    scoreboard.textContent="Score: " + score;
    HPBox.textContent = "HP = " + HP;
    player1.x = canvas.width/2;
    lowestY = enemy21.y + enemyHeight;
    leftEnemy = enemy21;
    rightEnemy = enemy30;
    leftMostCol = 0;
    rightMostCol = 9;

    setFXVol(FXSounds);
    if((MusicVolLvl/100) < 0.03){
        gameMusic.volume = 0;
    }
    else{
        gameMusic.volume = MusicVolLvl / 100;
    }
    gameMusic.play();
}

function execution(gameRunning1) {
    if(gameRunning){
        
        var canvas = document.getElementById("game_layer");
        var context = canvas.getContext("2d");
        context.fillStyle = "rgba(255, 255, 255, 0.5)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.clearRect(0, 0, canvas.width, canvas.height)
        if(!gamePaused){
            player1.update();
            player1.draw();

            if(weapon_shoot){
                if(projectile.y <= lowestY){
                    enemyCollisionDetection(enemies);
                }
                projectile.update();
                projectile.draw();
            }

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
    else if(!gameRunning && gameOverScreen){
        var canvas = document.getElementById("game_layer");
        var context = canvas.getContext("2d");
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(gameOverImg, (canvas.width/2) - (310/2), (canvas.height/2) - (218/2));
        context.drawImage(backBtn, (canvas.width/2) - (backBtn.width/2), (canvas.height/2) + (backBtn.height/3));
        context.font = "30px Comic Sans MS";
        context.textAlign = "center";
        context.fillText("SCORE: " + score, canvas.width/2, canvas.height/2);
        canvas.addEventListener('click', backToMenu, false);
        window.cancelAnimationFrame(execution);
    }
    else{window.cancelAnimationFrame(execution); return;}
}

execution(gameRunning);

/************************************Menu Functions************************************/

//called when player clicks canvas to go back to main menu after losing
function backToMenu(){
    canvas = document.getElementById("game_layer");
    canvas.removeEventListener('click', backToMenu);
    window.cancelAnimationFrame(execution);
    hideGameTables();
    showMenuTable();
}

//shows top and bottom game tables for when game is started
function showGameTables(){
    document.getElementById('game_table').className = "visible";
    document.getElementById('bottom_table').className = "visible";
}

//hides top and bottom game tables for when game ends
function hideGameTables(){
    document.getElementById('game_table').className = "hidden";
    document.getElementById('bottom_table').className = "hidden";
}

//to hide Main Menu table when the play button is clicked
function hideMenuTable(){
    //hide menu table
    document.getElementById('menu_table').style.visibility = "hidden";
    
}

/*to show menu table, called when back button on various menu tables are clicked
 or after verifying blank/valid PittID*/
function showMenuTable(){
    document.getElementById('menu_table').style.visibility = "visible";
}

/*hides main menu table and makes game tables visible
 *
 * called when play button is clicked*/
function playGame(){
    //set game to runnning and not paused
    gameRunning = true;
    gamePaused = false;
    hideMenuTable();
    setupNewGame();
    showGameTables();
    //call execution
    execution(gameRunning);
}

/*hides main menu table and makes settings table visible
* also handles input on the FX and Music volume level sliders
*
* called when settings button is clicked*/
function settingsMenu(){
    hideMenuTable();
    showSettingTable();
    var FXSlider = document.getElementById("FXVol");

    // Update the current slider value (each time you drag the slider handle)
    FXSlider.oninput = function() {
        FXVolLvl = this.value;
    }

    var MusicSlider = document.getElementById("MusicVol");

    // Update the current slider value (each time you drag the slider handle)
    MusicSlider.oninput = function() {
        MusicVolLvl = this.value;
    }
}

//sets volume for FX sounds
function setFXVol(FXArr){
    for(var tt = 0; tt < FXArr.length; tt++){
        var vol = FXVolLvl / 100;
        if(vol < 0.03){FXArr[tt].volume = 0.0;}
        else{FXArr[tt].volume = vol;}
    }
}

/*hides settings table and makes main menu table visible
*
* called when back button on settings menu is clicked*/
function settingsBackMenu(){
    hideSettingTable();
    showMenuTable();
}

/*toggles colorblind mode on/off
*
* called when user clicks colorblind toggle box*/
function colorBlindMode(){
    var checkBox = document.getElementById("checkBox");

    //if box is checked, turn off colorblind mode by setting var to false and uncheck box by hiding check img
    if(checkBox.className != "trans"){
        colorblind = false;
        checkBox.className = "trans";
        checkBox.src="all assets/normal/UI/overlay_assets/transparent.png";
    }
    else{ //else add check to box by making it visible and turn on colorblind mode by setting var to true
        colorblind = true;
        checkBox.className = "chkd";
        checkBox.src="all assets/normal/UI/overlay_assets/colorblindcheck1.png";
    }
}

/*hides main menu table and shows high scores table
*
* called when scores button is clicked*/
function scoreboardMenu(){
    //if the sortedNames (or sortedScores) array is empty, load then top 3 from DB
    if(sortedNames.length == 0){
        getTop3();
    }
    else{ //else hide main menu table and populate HS menu and make visible
        hideMenuTable();
        fillHighScores();
        showScoreboardTable();
    }
}

//populate high scores menu boxes with 3 highest scores and users highest score
function fillHighScores(){
    var userTS;
    if(user_id == ""){
        userTS = "No Pitt ID entered";
        HSBoxPlayer.textContent = userTS;
    }
    else{
        userTS = userHigh;
        if(userTS == -1 || userTS == null){
            HSBoxPlayer.textContent = user_id + " : " + 0;
        }
        else{
            HSBoxPlayer.textContent = user_id + " : " + userTS;
        }
    }

    HSBox1.textContent = sortedNames[0] + " : " + sortedScores[0];
    HSBox2.textContent = sortedNames[1] + " : " + sortedScores[1];
    HSBox3.textContent = sortedNames[2] + " : " + sortedScores[2];
}

/*hides high scores table and makes main menu table visible
*
  called when back button on high scores menu is clicked*/
function scoreboardBackMenu(){
    hideScoreboardTable(); 
    showMenuTable();
}

/*hides main menu table and credits table visible
*
  called when credits button on main menu is clicked*/
function creditsMenu(){
    hideMenuTable();
    showCreditsTable(); 
}

/*hides credits table and makes main menu table visible
*
  called when back button on credits menu is clicked*/
function creditsBackMenu(){
    hideCreditsTable(); 
    showMenuTable();
}

/*makes settings table visible when settings button is clicked*/
function showSettingTable(){
    document.getElementById("setting_table").style.visibility = "visible";
}
/*hides settings table when back button is clicked*/
function hideSettingTable(){
    document.getElementById("setting_table").style.visibility = "hidden";
}

/*makes high scores table visible when scores button is clicked*/
function showScoreboardTable(){
    document.getElementById("scoreboard_table").style.visibility = "visible";
}

/*hides high scores table when back button is clicked*/
function hideScoreboardTable(){
    document.getElementById("scoreboard_table").style.visibility = "hidden";
}

/*makes credits table visible when credits button is clicked*/
function showCreditsTable(){
    document.getElementById("credits_table").style.visibility = "visible";
}

/*hodes credits table when back button is clicked*/
function hideCreditsTable(){
    document.getElementById("credits_table").style.visibility = "hidden";
}

//shows top and bottom game tables for when game is started
function showIDPrompt(){
    document.getElementById('IDPrompt').className = "visible";
}

/*hides prompt for PittID after checking for validity in getPittID method*/
function hideIDPrompt(){
    document.getElementById('IDPrompt').className = "hidden";
}
/************************************End Menu Functions************************************/