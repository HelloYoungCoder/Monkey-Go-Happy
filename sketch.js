//Project 18: Monkey Go Happy - II

//Declare variables

var bgSprite, bgImage;
var animatedPlayer;
var groundSprite;
var fruitImage, obstacleImage;
var fruitGroup, obstacleGroup;
var score;

function preload() {
  
  //Load images & animation
  bgImage = loadImage("jungle.jpg");
  
  animatedPlayer = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  fruitImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  
  //Create a canvas
  createCanvas(600, 400);
  
  //Create a moving background
  bgSprite = createSprite(0,0,600,400);
  bgSprite.addImage(bgImage);
  bgSprite.scale = 1.5;
  
  bgSprite.x = bgSprite.width/2;
  bgSprite.velocityX = -3;
  
  //Make player & add animation
  playerSprite = createSprite(80,330,20,40);
  playerSprite.addAnimation("run_stage",animatedPlayer);
  playerSprite.scale = 0.15;
  
  //Create ground sprite
  groundSprite = createSprite(400,375,800,5);
  groundSprite.velocityX = -3;
  groundSprite.x = groundSprite.width/2;
  groundSprite.visible = false;
  
  //Create groups
  fruitGroup = new Group();
  obstacleGroup = new Group();
  
  //Assign score
  score = 0;
  
  //Set text
  textFont("Josefin Sans");
  textSize(25);
  noStroke();
  fill("white");
}

function draw() {
  background(220);
  
  //Display sprites on screen
  drawSprites();
  
  //Make the background to reset
  if (bgSprite.x < 0) {
   bgSprite.x = bgSprite.width/2; 
  }
  
  //Make the ground to reset
  if (groundSprite.x < 0) {
   groundSprite.x = groundSprite.width/2; 
  }
  
  //Make the player to jump only on the ground
  if (keyDown("space") && playerSprite.y >= 327) {
    playerSprite.velocityY = -15;
  }
  
  //Add velocity
  playerSprite.velocityY = playerSprite.velocityY + 0.8;
  
  //console.log(playerSprite.y);
  
  //Spawn fruits & obstacles
  spawnFruits();
  spawnObstacles();
  
  //Reduce the scale of the player when it touches obstacles
  if(obstacleGroup.isTouching(playerSprite)) { 
    playerSprite.scale = 0.08;
  }
  
  //Assign score
  if(fruitGroup.isTouching(playerSprite)) {
      fruitGroup.destroyEach();
      score = score + 2;
  }
  
  //Increase the scale based on score
  switch(score){
    case 10:playerSprite.scale = 0.12;
            break;
    case 20:playerSprite.scale = 0.14;
            break;
    case 30:playerSprite.scale = 0.16;
            break;
    case 40:playerSprite.scale = 0.18;
            break;
    default:break;
  }
  
  //Make the player to collide with ground
  playerSprite.collide(groundSprite);
  
  //Display score
  fill(222, 93, 84);
  text("Score: " + score,460,50);
}

function spawnFruits() {
  if (frameCount % 80 === 0) {
    var fruitSprite = createSprite(600,270,40,10);
    fruitSprite.y = random(120,200);    
    fruitSprite.addImage(fruitImage);
    fruitSprite.scale = 0.10;
    fruitSprite.velocityX = -5;
     
    //Assign lifetime
    fruitSprite.lifetime = 120;
    playerSprite.depth = fruitSprite.depth + 1;
    
    //Add to group
    fruitGroup.add(fruitSprite);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacleSprite = createSprite(600,350,10,40);
    obstacleSprite.velocityX = -6;
    obstacleSprite.addImage(obstacleImage);
        
    obstacleSprite.scale = 0.2;
    
    //Assign lifetime
    obstacleSprite.lifetime = 100;
    
    //Add to group
    obstacleGroup.add(obstacleSprite);
  }
}

