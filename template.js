var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(60);


//ProgramCodeGoesHere
//Final Project Checkpoint #2
//Author: Robert de Vries

//define the angleMode to be radians
angleMode = "radians";

var gameState = 0;
var wordBank = [
    "hello",
    "goodbye",
    "afternoon",
    "water",
    "racing",
    "hi"
];

//characters
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
    //line(this.x+i*20+50,this.y+40,this.x+i*20+60, this.y+40);
    //line(this.x+70,this.y+40,this.x+80, this.y+40);
    //line(this.x+90,this.y+40,this.x+100, this.y+40);
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
//define how the bubble pieces are drawn
explosionObj.prototype.draw = function() {
    fill(this.c1, this.c2, this.c3, this.timer);	// 4th value fader
    noStroke();
    ellipse(this.position.x, this.position.y, this.size, this.size);
    
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

var chosenWord = "";
var letters = [];
var keyPressed = function() {
    var correctLetter = 0;
    for (var i = 0; i < chosenWord.length; i++){
        if (key.toString() === chosenWord[i]){
            letters[i] = 1;
            correctLetter = 1;
        }
    }
    if (!correctLetter){
        hangmanObj.state++;
        if (hangmanObj.state === 6){
            println("Game over!");
            gameState = 3;
        }
    }
};

var checkVictory = function(){
    var win = 1;
    for (var i = 0; i < letters.length; i++){
        if (letters[i] === 0){
            win = 0;
        }
    }
    return win;
};

mouseClicked = function() {
    if (gameState === 0){
        gameState = 1;
    }
    else if (gameState === 1){
        var index = round(random(0,wordBank.length));
        chosenWord = wordBank[index];
        if (mouseX > 180 && mouseX < 250 && mouseY < 190 && mouseY > 160){
            while (chosenWord.length >= 4){
                index = round(random(0,wordBank.length));
                chosenWord = wordBank[index];
            }
            
            hangmanObj.wordLength = chosenWord.length;
            hangmanObj.state = 0;
            gameState = 2;
        }
        else if (mouseX > 180 && mouseX < 250 && mouseY < 240 && mouseY > 210){
            while (chosenWord.length >= 6 || chosenWord.length <= 2){
                index = round(random(0,wordBank.length));
                chosenWord = wordBank[index];
            }
            hangmanObj.wordLength = chosenWord.length;
            hangmanObj.state = 0;
            gameState = 2;
        }
        else if (mouseX > 180 && mouseX < 250 && mouseY < 290 && mouseY > 260){
            while (chosenWord.length <= 4){
                index = round(random(0,wordBank.length));
                chosenWord = wordBank[index];
            }
            hangmanObj.wordLength = chosenWord.length;
            hangmanObj.state = 0;
            gameState = 2;
        }
        else if (mouseX > 130 && mouseX < 300 && mouseY < 340 && mouseY > 310){
            gameState = 0;
        }
        //println(chosenWord);
        for (var i = 0; i < chosenWord.length; i++){
            letters[i] = 0;
        }
    }
};



var tileMap = [
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



var wallObj = function(x, y) {
    this.x = x;
    this.y = y;
};

var airObj = function(x, y) {
    this.x = x;
    this.y = y;
};

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

var dotObj = function(x, y) {
    this.x = x;
    this.y = y;
    this.eaten = 0;
};

var jointObj = function(x, y) {
    this.x = x;
    this.y = y;
};  

var pDotObj = function(x, y) {
    this.x = x;
    this.y = y;
    this.eaten = 0;
};    

var walls = [];
var airs = [];
var ghosts = [];
var dots = [];
var joints = [];
var pDots = [];

var initializeTM = function() {
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

wallObj.prototype.draw = function() {
    noStroke();
    fill(125, 125, 125);
    rect(this.x, this.y, 20, 20);
};

airObj.prototype.draw = function() {
    noStroke();
};

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

ghostObj.prototype.atJoint = function() {
    var j = 0;
    for (var i = 0; i < joints.length; i++) {
        if ((this.x === joints[i].x) && (this.y === joints[i].y)) {
            j = 1;   
        }    
    }    
    
    return j;
};    

///// EXPERIMENT /////
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

dotObj.prototype.draw = function() {
    noStroke();
    fill(0, 255, 0);
    ellipse(this.x, this.y, 7, 7);
};

pDotObj.prototype.draw = function() {
    noStroke();
    fill(9, 0, 255);
    ellipse(this.x, this.y, 15, 15);
};

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

initializeTM();


var draw = function() {
    background(34, 0, 255);
    for (var i = 0; i<waves.length; i++) {
        waves[i].update();
        waves[i].draw();
    }
    if (gameState === 0){
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
        text("Choose your starting difficulty!!", 150, 125);
        
        text("Easy", 200, 175);
        text("Medium", 200, 225);
        text("Hard", 200, 275);
        text("Return to starting screen",150,325);
    }
    else if (gameState === 2){
        hangmanObj.display();
        for (var i = 0; i < letters.length; i++){
            if (letters[i] === 1){
                text(chosenWord[i],hangmanObj.x+52+i*20,hangmanObj.y+35);
                text(chosenWord[i],hangmanObj.x+52+i*20,hangmanObj.y+35);
                text(chosenWord[i],hangmanObj.x+52+i*20,hangmanObj.y+35);
            }
            
        }
        playerObj.display();
        drawTM();
        
        if (checkVictory()){
            println("You WON!");
            gameState = 4;
        }
    }
};



}};
