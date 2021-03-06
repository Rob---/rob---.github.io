var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(60);


//ProgramCodeGoesHere
//Final Project
//Author: Robert de Vries

//define the angleMode to be radians
angleMode = "radians";
//initialize the game state
var gameState = 0;
//define the wordbank used for the game
var wordBank = [
    "hello",
    "goodbye",
    "afternoon",
    "water",
    "racing",
    "hi",
    "day",
    "evening",
    "morning",
    "game",
    "design",
    "project",
    "to",
    "two",
    "too",
    "who",
    "how",
    "technical",
    "computer",
    "engineer",
    "engineering",
    "computers",
    "sharks",
    "fish",
    "car",
    "vehicles",
    "bottle",
    "guild",
    "mafia",
    "internet",
    "headphone",
    "ears",
    "nose",
    "mouth",
    "CD",
    "scissors",
    "coins",
    "money",
    "dollar",
    "yen",
    "pokemon",
    "Japan",
    "America",
    "China",
    "Taiwan",
    "Europe",
    "France",
    "Germany",
    "phone",
    "cell",
    "transistor",
    "brush",
    "hair",
    "eyes",
    "finger",
    "whale",
    "underwater",
    "xbox",
    "console",
    "monitor",
    "embedded",
    "khan",
    "academy",
    "hangman",
    "hang",
    "man",
    "woman",
    "student",
    "teacher",
    "professor",
    "glass",
    "apartment",
    "house",
    "move",
    "Atlanta",
    "Blacksburg",
    "Sony",
    "picture",
    "frame",
    "happy",
    "wizard",
    "video"
];

//player character, non-movable
var player = function(x,y){
    this.x = x;
    this.y = y;
    this.state = 0;
};
//player will be underwater vehicle
player.prototype.display = function(){
    fill(94, 94, 94);
    ellipse(this.x,this.y-10,30,10);
    fill(0, 0, 0);
    ellipse(this.x-7,this.y-5,10,10);
    ellipse(this.x+7,this.y-5,10,10);
    fill(255, 255, 255);
    ellipse(this.x-8.3,this.y-11,10,5);
    
};
//instantiate the player object
var playerObj = new player(350,160);
//define the hangman object
var hangman = function(x,y){
    this.x = x;
    this.y = y;
    this.state = 0;
    this.currFrame = 0;
    this.wordLength = 3;
};
//define how the hangman is drawn
hangman.prototype.display = function(){
    fill(0,0,0);
    rect(this.x,this.y, 2,40);
    rect(this.x-10,this.y+40, 20,2);
    rect(this.x,this.y, 15,2);
    rect(this.x+15,this.y, 2,10);
    //letters (wrong)
    //blanks
    stroke(0,0,0);
    for (var i = 0; i < this.wordLength; i++){
        line(this.x+i*20+50,this.y+40,this.x+i*20+60, this.y+40);
    }
    switch(this.state){
        case 0: //nothing
            break;
        case 1: //head
            ellipse(this.x+15,this.y+10,10,10);
            break;
        case 2: //body
            //head
            ellipse(this.x+15,this.y+10,10,10);
            //body
            rect (this.x+15,this.y+15,1,15);
            break;
        case 3: //arm 1
            //head
            ellipse(this.x+15,this.y+10,10,10);
            //body
            rect (this.x+15,this.y+15,1,15);
            stroke(0,0,0);
            //arms
            line(this.x+15,this.y+20,this.x+5,this.y+15);
            break;
        case 4: //arm 2
            //head
            ellipse(this.x+15,this.y+10,10,10);
            //body
            rect (this.x+15,this.y+15,1,15);
            stroke(0,0,0);
            //arms
            line(this.x+15,this.y+20,this.x+5,this.y+15);
            line(this.x+15,this.y+20,this.x+25,this.y+15);
            break;
        case 5: //leg 1
            //head
            ellipse(this.x+15,this.y+10,10,10);
            //body
            rect (this.x+15,this.y+15,1,15);
            stroke(0,0,0);
            //arms
            line(this.x+15,this.y+20,this.x+5,this.y+15);
            line(this.x+15,this.y+20,this.x+25,this.y+15);
            //legs
            line(this.x+15,this.y+30,this.x+9,this.y+35);
            break;
        case 6: //leg 2
            //head
            ellipse(this.x+15,this.y+10,10,10);
            //body
            rect (this.x+15,this.y+15,1,15);
            stroke(0,0,0);
            //arms
            line(this.x+15,this.y+20,this.x+5,this.y+15);
            line(this.x+15,this.y+20,this.x+25,this.y+15);
            //legs
            line(this.x+15,this.y+30,this.x+21,this.y+35);
            line(this.x+15,this.y+30,this.x+9,this.y+35);
            break;
        case 7: //show final words
            //head
            ellipse(this.x+15,this.y+10,10,10);
            //body
            rect (this.x+15,this.y+15,1,15);
            stroke(0,0,0);
            //arms
            line(this.x+15,this.y+20,this.x+5,this.y+15);
            line(this.x+15,this.y+20,this.x+25,this.y+15);
            //legs
            line(this.x+15,this.y+30,this.x+21,this.y+35);
            line(this.x+15,this.y+30,this.x+9,this.y+35);
            //letters (correct)
            text("o",this.x+52,this.y+35);
            text("f",this.x+74,this.y+35);
            text("f",this.x+94,this.y+35);
            break;
    }
    //handle animation of the hangman
    if (gameState === 0){
        if (this.currFrame < (frameCount - 15)) {
            this.currFrame = frameCount;
            this.state++;
            if (this.state > 7) {
                this.state = 0;
            }
        }
    }
    
};
//instantiate the starting screen hangman
var hangmanObj = new hangman(150,10);



//bubbles
//define the bubble pieces object
var explosionObj = function(a) {
    this.position = new PVector(0, 0);
    this.direction = new PVector(0, 0);
    this.size = random(1, 3);
    this.c1 = 255;
    this.c2 = 255;
    this.c3 = 255;
    this.timer = 180;
};    
//define the entire bubble object
var bubbleObj = function(a,x,y) {
    this.position = new PVector(x, y);
    this.direction = new PVector(0, 0);
    this.target = new PVector(x, y);
    this.step = 1;
    this.explosions = [];
    for (var i = 0; i < 200; i++) {
        this.explosions.push(new explosionObj(a));   
    }    
};  

//define how the entire bubble object is drawn
bubbleObj.prototype.draw = function() {
    fill(255, 255, 255);
    noStroke();
    ellipse(this.position.x, this.position.y, 2, 2);
    this.position.add(this.direction);
    if (dist(this.position.x, this.position.y, this.target.x, this.target.y) < 4) {
        this.step = 2;
        for (var i = 0; i < this.explosions.length; i++) {
            this.explosions[i].position.set(this.target.x, this.target.y);
            
            this.explosions[i].direction.set(random(0, 360), random(-0.3, 0.3));
            this.explosions[i].timer = 180;
        }
    }    
};
//define the walls array so we can use for making bubbles not run into walls
var walls = [];
//define how the bubble pieces are drawn
explosionObj.prototype.draw = function() {
    fill(this.c1, this.c2, this.c3, this.timer);	// 4th value fader
    noStroke();
    var dontDraw = 0;
    for (var i = 0; i < walls.length; i++){
        if (dist(this.position.x,this.position.y, walls[i].x, walls[i].y) < 20){
            dontDraw = 1;
        }
    }
    if (!dontDraw){
        ellipse(this.position.x, this.position.y, this.size, this.size);
    }
    
    this.position.x += this.direction.y*cos(this.direction.x);
    this.position.y += this.direction.y*sin(this.direction.x);
    this.position.y -= (90/(this.timer + 100));
    this.timer--;
};
//create an array to store all of the active bubbles
var bubbles = [];



//Define the shark
var shark = function(x, y) {
    this.position = new PVector(x, y);
    this.velocity = new PVector(-1, 0);
    this.angle = 0;
    this.currFrame = 0;
    this.stop = 0;
    this.bubbleCounter = 0;
};
//Used for animation
var counter = 0;
var increase = true;
//Define how the shark is drawn & animated
shark.prototype.draw  = function() {
    if (this.bubbleCounter < 225){
        this.bubbleCounter++;
    }
    else{
        bubbles.push(new bubbleObj(0,this.position.x-25,this.position.y-2));
        this.bubbleCounter = 0;
    }
    pushMatrix();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    noStroke();
    
    fill(255, 0, 0);
    ellipse(0, 0, 40,7.5);
    triangle(0, -9.5, -10, 1, 0, 1);
    triangle(-10, 0, 0, 0, 5, 10);
    if (counter === 3){
        increase = false;
    }
    else if (counter === -5){
        increase = true;
    }
    
    if (increase === true){
        counter = counter+0.5;
    }
    else{
        counter = counter-0.5;
    }
    triangle((20-counter), -5, 10, 0, (20-counter), 5);
    fill(0,0,0);
    ellipse(-15, 0, 2.5, 2.5);
    
    rotate(-PI/2);
    
    popMatrix();
    
};
var sFrame = 0;
//define how the shark moves
shark.prototype.move = function() {
    //this.checkObs();
    if (this.stop === 0){
        this.position.add(this.velocity);
    }
    if (this.position.x < -25) {
        this.position.x = 425;
    }
    else if (this.position.x > 425) {
        this.position.x = -25;
    }
    if (this.position.y < -25) {
        this.position.y = 425;
    }
    else if (this.position.y > 425) {
        this.position.y = -25;
    }
};
//instantiate the 2 sharks for the main menu
var sharkObj = new shark(350,355);
var sharkObj2 = new shark(150,130);

//define a wave
var wave = function(amplitude, period, color) {
    this.startAngle = 0;
    this.amplitude = amplitude;
    this.period = period;
    this.color = color;
    this.angleVel = (TWO_PI / this.period) * 10;
};
//update waves as needed
wave.prototype.update = function() {
    this.startAngle += TWO_PI / this.period/2;
};
//define how waves are drawn
wave.prototype.draw = function() {
    var a = this.startAngle;
    noStroke();
    fill(255, 255, 255);
    for (var x =0; x<width; x += 24) {
        var y = this.amplitude * sin(a);
        ellipse(x, y, 80, 60);
        a += this.angleVel;
    }
};


//create waves
var amp = 3;
var period = 20;
var waves = [];
for (var i=0; i<15; i++) {
    waves.push(new wave(30+i*amp, 100+i*period, color(0, 0, 255, 25+i*10)));
}

//instantiate the string for the word used in the game
var chosenWord = "";
//instantiate the array for keeping track of victory conditions
var letters = [];
//create the function thaht handles receiving key input
var keyPressed = function() {
    var correctLetter = 0;
    for (var i = 0; i < chosenWord.length; i++){
        //if we received a key, go through the chosenWord and see if that letter exists
        if (key.toString() === chosenWord[i]){
            letters[i] = 1;
            correctLetter = 1;
        }
    }
    //if the letter wasn't found in the word, then increment the hangMan object state
    //if we are at state 6, then the player has lost
    if (!correctLetter){
        hangmanObj.state++;
        if (hangmanObj.state === 6){
            gameState = 3;
        }
    }
};
//check for the victory condition (they have guessed the word)
var checkVictory = function(){
    var win = 1;
    for (var i = 0; i < letters.length; i++){
        if (letters[i] === 0){
            win = 0;
        }
    }
    return win;
};
//create a variable that allows for different tilemaps based on difficulty
var difficulty;
//instantiate some necessary variables and arrays for the game
var init = 0;
var tileMap = [];
var airs = [];
var ghosts = [];
var dots = [];
var joints = [];
var pDots = [];
//define what occurs when the mouse is clicked
mouseClicked = function() {

    //if we are at the title menu, move to the options screen
    if (gameState === 0){
        gameState = 1;
    }//depending on where we click on the options screen, either start the game or go elsewhere
    else if (gameState === -1){
        if (mouseX > 130 && mouseX < 300 && mouseY < 340 && mouseY > 310){
            gameState = 0;
        }
    }
    else if (gameState === 1){
        var index = round(random(0,wordBank.length));
        chosenWord = wordBank[index];
        
        if (mouseX > 180 && mouseX < 250 && mouseY < 140 && mouseY > 110){
            
            hangmanObj.state = 0;
            gameState = -1;
        }
        else if (mouseX > 180 && mouseX < 250 && mouseY < 190 && mouseY > 160){
            difficulty = 0;
            while (chosenWord.length >= 4){
                index = round(random(0,wordBank.length));
                chosenWord = wordBank[index];
            }
            hangmanObj.wordLength = chosenWord.length;
            hangmanObj.state = 0;
            gameState = 2;
        }
        else if (mouseX > 180 && mouseX < 250 && mouseY < 240 && mouseY > 210){
            difficulty = 1;
            while (chosenWord.length >= 6 || chosenWord.length <= 2){
                index = round(random(0,wordBank.length));
                chosenWord = wordBank[index];
            }
            hangmanObj.wordLength = chosenWord.length;
            hangmanObj.state = 0;
            gameState = 2;
        }
        else if (mouseX > 180 && mouseX < 250 && mouseY < 290 && mouseY > 260){
            difficulty = 2;
            while (chosenWord.length <= 4){
                index = round(random(0,wordBank.length));
                chosenWord = wordBank[index];
            }
            hangmanObj.wordLength = chosenWord.length;
            hangmanObj.state = 0;
            gameState = 2;
        }
        else if (mouseX > 180 && mouseX < 250 && mouseY < 340 && mouseY > 310){
            difficulty = 3;
            while (chosenWord.length <= 4){
                index = round(random(0,wordBank.length));
                chosenWord = wordBank[index];
            }
            hangmanObj.wordLength = chosenWord.length;
            hangmanObj.state = 0;
            gameState = 2;
        }
        else if (mouseX > 130 && mouseX < 300 && mouseY < 390 && mouseY > 360){
            gameState = 0;
        }
        for (var i = 0; i < chosenWord.length; i++){
            letters[i] = 0;
        }
    }//if we are at either end game screen and click, return the player to the title screen
    else if (gameState === 3 || gameState === 4){
        gameState = 0;
        hangmanObj.wordLength = 3;
        hangmanObj.state = 0;
        init = 0;
        tileMap = [];
        walls = [];
        ghosts = [];
        joints = [];
    }
};


//define the tilemap for the easy difficulty (1 shark)
var tileMapEasy = [
    "aaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaa",
    "w wwwwj    g   jwwww",
    "wj   jwwwwwwwwj    w",
    "wwwwww wwwww   jwwww",
    "wjjww j jwwwwwwj  ww",
    "w  wwwwwj jjwwjjwwww",
    "wjj    www  ww wj  w",
    "w  wwwwwwwjj  jjjwww",
    "w  wwwj   jwwww wwww",
    "wjj   jwwwwwwwwj   w",
    "w wwwwj        jwwww",
    "wj    jwwwwwwwwj   w",
    "wwwwww wwwwwj  jwwww",
    "wjjwwjj jwjjjwwj zww",
    "wjj  jwwj jjww jwwww",
    "wwwwwwwwwwwwwwwwwwww"
];
//define the tilemap for the medium difficulty (2 sharks)
var tileMapMedium = [
    "aaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaa",
    "w wwwwj    g   jwwww",
    "wj   jwwwwwwwwj    w",
    "wwwwww wwwww   jwwww",
    "wjjww j jwwwwwwj  ww",
    "w gwwwwwj jjwwjjwwww",
    "wjj    www  ww wj  w",
    "w  wwwwwwwjj  jjjwww",
    "w  wwwj   jwwww wwww",
    "wjj   jwwwwwwwwj   w",
    "w wwwwj        jwwww",
    "wj    jwwwwwwwwj   w",
    "wwwwww wwwwwj  jwwww",
    "wjjwwjj jwjjjwwj zww",
    "wjj  jwwj jjww jwwww",
    "wwwwwwwwwwwwwwwwwwww"
];
//define the tilemap for the medium difficulty (4 sharks)
var tileMapHard = [
    "aaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaa",
    "w wwwwj    g   jwwww",
    "wj   jwwwwwwwwj    w",
    "wwwwww wwwww   jwwww",
    "wjjww j jwwwwwwj  ww",
    "w gwwwwwj jjwwjjwwww",
    "wjj    www  ww wj  w",
    "w  wwwwwwwjj  jjjwww",
    "w  wwwj   jwwww wwww",
    "wjj   jwwwwwwwwj   w",
    "w wwwwjg       jwwww",
    "wj    jwwwwwwwwj   w",
    "wwwwww wwwwwj  jwwww",
    "wjjwwjj jwjjjwwj zww",
    "wjjg jwwj jjww jwwww",
    "wwwwwwwwwwwwwwwwwwww"
];
//define the tilemap for the very hard difficulty (4 sharks, 1 is very close)
var tileMapHard2 = [
    "aaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaa",
    "w wwwwj    g   jwwww",
    "wj   jwwwwwwwwj    w",
    "wwwwww wwwww   jwwww",
    "wjjww j jwwwwwwj  ww",
    "w gwwwwwj jjwwjjwwww",
    "wjj    www  ww wj  w",
    "w  wwwwwwwwwwwjjjwww",
    "w  www wwwwwwww wwww",
    "wjj   j   wwwwwj   w",
    "w wwwwjg   ww  jwwww",
    "wj    jwwwwwwwwj  gw",
    "wwwwww wwwwwj  jwwww",
    "wjjwwjj jwjjjwwj zww",
    "wjj  jwwj jjww jwwww",
    "wwwwwwwwwwwwwwwwwwww"
];


//define wall objects
var wallObj = function(x, y) {
    this.x = x;
    this.y = y;
};
//define air objects
var airObj = function(x, y) {
    this.x = x;
    this.y = y;
};
//define ghost objects
var ghostObj = function(x, y) {
    this.x = x;
    this.y = y;
    this.direction = 1;
    this.speed = 1;
    this.cColor = 0;
    this.timer = 0;
    this.angle = 0;
    this.bubbleCounter = 0;
};
//define dot objects
var dotObj = function(x, y) {
    this.x = x;
    this.y = y;
    this.eaten = 0;
};
//define joint objects
var jointObj = function(x, y) {
    this.x = x;
    this.y = y;
};  
//define pDotObjects
var pDotObj = function(x, y) {
    this.x = x;
    this.y = y;
    this.eaten = 0;
};    

//define how the map is initialized
var initializeTM = function() {
    //determine which tileMap we use based on the difficulty level
    //This mainly determines the number of sharks present in the map
    if (difficulty === 0){
        tileMap = tileMapEasy;
    }
    else if (difficulty === 1){
        tileMap = tileMapMedium;
    }
    else if (difficulty === 2){
        tileMap = tileMapHard;
    }
    else if (difficulty === 3){
        tileMap = tileMapHard2;
    }
    //go through the chosen tilemap and generate it.
    for (var i = 0; i < tileMap.length; i++) {
        for (var j = 0; j < tileMap[i].length; j++) {
            switch(tileMap[i][j]) {
                case 'w':
                    walls.push(new wallObj(j*20, i*20));
                    break;
                case 'g':
                    ghosts.push(new ghostObj(j*20 + 10, i*20 + 10));
                    break;
                case ' ':
                    break;
                case 'j':
                    //dots.push(new dotObj(j*20 + 10, i*20 + 10));
                    if (tileMap[i][j] === 'j') {
                        joints.push(new jointObj(j*20  + 10, i*20 + 10));   
                    }    
                    break;
                case 'z':
                    //pDots.push(new pDotObj(j*20 + 10, i*20 + 10));
                    playerObj = new player(j*20+10,i*20+20);
                    break;
                case 'a':
                    airs.push(new airObj(j*20,i*20));
                    break;
            }    
        }    
    }    
}; 
//define how wall objects are drawn
wallObj.prototype.draw = function() {
    noStroke();
    fill(125, 125, 125);
    rect(this.x, this.y, 20, 20);
};
//define how air objects are drawn
airObj.prototype.draw = function() {
    noStroke();
};
//define how shark objects are drawn
ghostObj.prototype.draw = function() {
    noStroke();
    if (this.cColor === 0) {
        if (this.bubbleCounter < 225){
            this.bubbleCounter++;
        }
        else{
            bubbles.push(new bubbleObj(0,this.x,this.y-2));
            this.bubbleCounter = 0;
        }
        pushMatrix();
        translate(this.x,this.y);
        rotate(this.angle);
        noStroke();
        fill(255, 0, 0);
        ellipse(0, 0, 40,7.5);
        triangle(0, -9.5, -10, 1, 0, 1);
        triangle(-10, 0, 0, 0, 5, 10);
        if (counter === 3){
            increase = false;
        }
        else if (counter === -5){
            increase = true;
        }
        if (increase === true){
            counter = counter+0.5;
        }
        else{
            counter = counter-0.5;
        }
        triangle((20-counter), -5, 10, 0, (20-counter), 5);
        fill(0,0,0);
        ellipse(-15, 0, 2.5, 2.5);
        popMatrix();
    }
    else if (this.cColor === 1) {
        fill(255, 255, 0);
        this.timer--;
        if (this.timer <= 80) {
            this.cColor = 2;   
        }    
    }  
    else {
        fill(255, 162, 0);
        this.timer--;
        if (this.timer <= 0) {
            this.cColor = 0;   
        }       
    }    
};
//define how shark objects collide with walls
ghostObj.prototype.collide = function() {
    var c = 0;
    for (var i = 0; i < walls.length; i++) {
        if (dist(this.x, this.y, walls[i].x + 10, walls[i].y + 10) < 20) {
            c = 1;   
        }    
    } 
    for (var i = 0; i < airs.length; i++){
        if (dist(this.x, this.y, airs[i].x + 10, airs[i].y + 10) < 20) {
            c = 1;   
        }    
    }
    if (dist(this.x, this.y, playerObj.x, playerObj.y) < 20){
        c = 2;
    }
    
    return c;
};    
//define how sharks behave at joints
ghostObj.prototype.atJoint = function() {
    var j = 0;
    for (var i = 0; i < joints.length; i++) {
        if ((this.x === joints[i].x) && (this.y === joints[i].y)) {
            j = 1;   
        }    
    }    
    
    return j;
};    

//define how sharks move
ghostObj.prototype.move = function() {
    if ((this.atJoint() === 1) && (random(0, 10) < 5)) {
        this.direction = floor(random(1, 5));
        
    }    
    
    switch (this.direction) {
        case 1: //right
            this.angle = PI;
            this.x += this.speed;
            if (this.collide() === 1) {
                this.x -= this.speed;
                this.direction = floor(random(1, 5));
            }
            break;
        case 2: //left
            this.angle = 0;
            this.x -= this.speed;
            if (this.collide() === 1) {
                this.x += this.speed;
                this.direction = floor(random(1, 5));
            }
            break;  
        case 3: //down
            this.angle = -PI/2;
            this.y += this.speed;
            if (this.collide() === 1) {
                this.y -= this.speed;
                this.direction = floor(random(1, 5));
            }
            break;
        case 4: //up
            this.angle = PI/2;
            this.y -= this.speed;
            if (this.collide() === 1) {
                this.y += this.speed;
                this.direction = floor(random(1, 5));
            }
            break;    
    }
    if (this.collide() === 2){
        println("GAME OVER");
        gameState = 3;
    }
};    
//define how dots are drawn
dotObj.prototype.draw = function() {
    noStroke();
    fill(0, 255, 0);
    ellipse(this.x, this.y, 7, 7);
};
//define how pDots are drawn
pDotObj.prototype.draw = function() {
    noStroke();
    fill(9, 0, 255);
    ellipse(this.x, this.y, 15, 15);
};
//define how the tilemap is drawn
var drawTM = function() {
    for (var i = 0; i < walls.length; i++) {
        walls[i].draw();         
    } 
    for (i = 0; i < dots.length; i++) {
        if (dots[i].eaten === 0) {
            dots[i].draw();  
        }    
    }
    for (i = 0; i < pDots.length; i++) {
        if (pDots[i].eaten === 0) {
            pDots[i].draw();  
        }   
    }    
    for (i = 0; i < ghosts.length; i++) {
        ghosts[i].draw();     
        ghosts[i].move();
    }
}; 



var timeCounter = 0;
var totalTime = 0;
//define how the game functions
var draw = function() {
    background(34, 0, 255);
    for (var i = 0; i<waves.length; i++) {
        waves[i].update();
        waves[i].draw();
    }
    if (gameState === 0){
        totalTime = 0;
        playerObj.display();
        hangmanObj.display();
        sharkObj.draw();
        sharkObj.move();
        sharkObj2.draw();
        sharkObj2.move();
        for (var j = 0; j < bubbles.length; j++) {
            if (bubbles[j].step === 1) {
                bubbles[j].draw();
            } 
            else if (bubbles[j].step === 2) {
                for (var i = 0; i < bubbles[j].explosions.length; i++) {
                    //draw all of the bubble's parts
                    bubbles[j].explosions[i].draw();   
                } 
                if (bubbles[j].explosions[0].timer <= 0) {
                    //remove the bubble object from the list of bubbles
                    //once it has reached the end of it's "existence"
                    bubbles.splice(j,1);
                }
            }
        }
        fill(255,255,255);
        text("Welcome to Race for the Word!", 50,150);
        text("In this game you'll be racing against the shark", 50, 175);
        text("who is trying to find your underwater vehicle and eat you!", 50, 200);
        text("the only way to survive is to guess the word before he finds you!", 50, 225);
        text("However, there's a catch!  You can only guess 1 letter", 50, 250);
        text("at a time, and you only have 6 tries to get ALL of the letters", 50, 275);
        text("correct!  Click to proceed to the options screen when ready", 50, 300);
        text("to choose your difficulty level!!  Good luck!!", 50, 325);
    }
    else if (gameState === 1){
        text("Instructions",185,125);
        
        text("Easy", 200, 175);
        text("Medium", 200, 225);
        text("Hard", 200, 275);
        text("Very Hard", 200, 325);
        text("Return to starting screen",150,375);
        
    }
    else if (gameState === 2){
        if (init === 0){
            init = 1;
            initializeTM();
        }
        timeCounter++;
        if (timeCounter === 59){
            totalTime++;
            timeCounter = 0;
        }
        //display thhe hangman at the proper state & the letters that have been correctly guessed
        hangmanObj.display();
        for (var i = 0; i < letters.length; i++){
            if (letters[i] === 1){
                text(chosenWord[i],hangmanObj.x+52+i*20,hangmanObj.y+35);
                text(chosenWord[i],hangmanObj.x+52+i*20,hangmanObj.y+35);
                text(chosenWord[i],hangmanObj.x+52+i*20,hangmanObj.y+35);
            }
            
        }
        //draw the player
        playerObj.display();
        //draw the tilemap
        drawTM();
        //draw bubbles
        for (var j = 0; j < bubbles.length; j++) {
            if (bubbles[j].step === 1) {
                bubbles[j].draw();
            } 
            else if (bubbles[j].step === 2) {
                for (var i = 0; i < bubbles[j].explosions.length; i++) {
                    //draw all of the bubble's parts
                    bubbles[j].explosions[i].draw();   
                } 
                if (bubbles[j].explosions[0].timer <= 0) {
                    //remove the bubble object from the list of bubbles
                    //once it has reached the end of it's "existence"
                    bubbles.splice(j,1);
                }
            }
        }
        
        if (checkVictory()){
            gameState = 4;
        }
    }
    else if (gameState === -1){
        text("Click on the screen at the start of the game.", 100, 175);
        text("To guess a letter for hangman, type a letter on the keyboard!", 50, 225);
        text("You need to guess the word before the Shark finds your vehicle!", 40, 275);
        text("Return to starting screen",150,325);
    }
    else if (gameState === 3){
        text("GAME OVER", 175, 175);
        text("Better luck next time, click to play again!", 100, 225);
        var endWord = "The word was: "+chosenWord;
        text(endWord,150,275);
    }
    else if (gameState === 4){
        text("Congratulations! You WON!  Click to play again!", 100, 175);
        var endTime = "Your time was: "+totalTime+" seconds!";
        text(endTime,150,275);
    }
};



}};
